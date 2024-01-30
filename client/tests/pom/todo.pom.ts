import { expect, type Locator, type Page } from '@playwright/test';

import { type TodoModel } from '../../src/todo/todo.models';

export class TodoPom {
    readonly todoList: Locator;
    readonly addTaskInput: Locator;
    readonly filterAllButton: Locator;
    readonly filterActiveButton: Locator;
    readonly filterCompletedButton: Locator;

    constructor(public readonly page: Page) {
        this.todoList = page.locator('ul.list-group');
        this.addTaskInput = page.getByPlaceholder('New Task...');
        this.filterAllButton = page.getByRole('button', { name: 'All' });
        this.filterActiveButton = page.getByRole('button', { name: 'Active' });
        this.filterCompletedButton = page.getByRole('button', { name: 'Completed' });
    }

    async setUpApiCalls() {
        await this.page.route(`${process.env.SERVER_URL}/api/todos`, async (route) => {
            if (route.request().method() !== 'GET') {
                await route.fallback();
                return;
            }

            const json: TodoModel[] = [
                {
                    id: 1,
                    text: 'My first TODO',
                    completed: false,
                },
                {
                    id: 2,
                    text: 'I have completed this',
                    completed: true,
                },
            ];

            await route.fulfill({ json });
        });
    }

    async goto() {
        await this.page.goto('/todo');
    }

    async addTodo(text: string) {
        await this.addTaskInput.fill(text);
        await this.addTaskInput.press('Enter');
    }

    async assertTodoCount(count: number) {
        await expect(this.todoList).toBeVisible();

        await expect(this.todoList.locator('li')).toHaveCount(count);
    }
}
