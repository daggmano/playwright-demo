import { expect, test as base } from '@playwright/test';
import { TodoPom } from '../pom/todo.pom';

const test = base.extend<{ todoPage: TodoPom }>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPom(page);
        await todoPage.setUpApiCalls();
        await todoPage.goto();
        await use(todoPage);
    },
});

test('should get correct items', async ({ todoPage, page }) => {
    await expect(page.getByText('My first TODO')).toBeVisible();
});
