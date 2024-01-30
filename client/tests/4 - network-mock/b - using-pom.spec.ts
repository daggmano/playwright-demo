import { expect, test as base } from '@playwright/test';
import { TodoPom } from '../pom/todo.pom';
import { waitForAndFulfillRequest } from '../helpers/network-helper';

const test = base.extend<{ todoPage: TodoPom }>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPom(page);
        await todoPage.setUpApiCalls();
        await todoPage.goto();
        await use(todoPage);
    },
});

test('should get correct items', async ({ todoPage }) => {
    await todoPage.assertTodoCount(2);
});

test('should accept a new todo', async ({ todoPage, page }) => {
    const newText = 'This is a new TODO';

    const requestPromise = waitForAndFulfillRequest(
        page,
        'POST',
        `${process.env.SERVER_URL}/api/todos`,
        { id: 3, text: newText, completed: false },
    );

    await todoPage.addTodo(newText);

    const request = await requestPromise;
    const postData = request.postDataJSON();

    expect(postData).toMatchObject({ text: newText, id: 0, completed: false });
});

test('should complete a todo', async ({ todoPage, page }) => {
    const requestPromise = waitForAndFulfillRequest(
        page,
        'PUT',
        `${process.env.SERVER_URL}/api/todos/1`,
        { id: 1, text: 'My first TODO', completed: true },
    );

    const completeCheckbox = todoPage.todoList.locator('li', { hasText: 'My first TODO' }).getByRole('checkbox');

    await expect(completeCheckbox).not.toBeChecked();

    // Note: Using '.check()' here will fail as Playwright expects the state of the checkbox to change.
    // In this app, the state would only change once data is returned from the server.
    await completeCheckbox.click();

    const request = await requestPromise;
    const postData = request.postDataJSON();

    expect(postData).toMatchObject({ text: '', id: 1, completed: true });
});

test('should uncomplete a todo', async ({ todoPage, page }) => {
    const requestPromise = waitForAndFulfillRequest(
        page,
        'PUT',
        `${process.env.SERVER_URL}/api/todos/2`,
        { id: 2, text: 'I have completed this', completed: false },
    );

    const completeCheckbox = todoPage.todoList.locator('li', { hasText: 'I have completed this' }).getByRole('checkbox');

    await expect(completeCheckbox).toBeChecked();

    // Note: Using '.check()' here will fail as Playwright expects the state of the checkbox to change.
    // In this app, the state would only change once data is returned from the server.
    await completeCheckbox.click();

    const request = await requestPromise;
    const postData = request.postDataJSON();

    expect(postData).toMatchObject({ text: '', id: 2, completed: false });
});

test('should delete a todo', async ({ todoPage, page }) => {
    const requestPromise = waitForAndFulfillRequest(
        page,
        'DELETE',
        `${process.env.SERVER_URL}/api/todos/2`,
        { },
    );

    const deleteButton = todoPage.todoList.locator('li', { hasText: 'I have completed this' }).getByRole('button');

    await deleteButton.click();

    const request = await requestPromise;

    // Of course, this will pass if it gets here as that's what we've specified for the request, but this makes sure we get here.
    expect(request.method()).toBe('DELETE');
});

test('should correctly filter items', async ({ todoPage }) => {
    await todoPage.assertTodoCount(2);

    await todoPage.filterActiveButton.click();
    await todoPage.assertTodoCount(1);
    await expect(todoPage.todoList.getByText('My first TODO')).toBeVisible();

    await todoPage.filterCompletedButton.click();
    await todoPage.assertTodoCount(1);
    await expect(todoPage.todoList.getByText('I have completed this')).toBeVisible();

    await todoPage.filterAllButton.click();
    await todoPage.assertTodoCount(2);
    await expect(todoPage.todoList.getByText('My first TODO')).toBeVisible();
    await expect(todoPage.todoList.getByText('I have completed this')).toBeVisible();
});
