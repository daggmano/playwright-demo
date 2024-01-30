import { type Locator, type Page } from '@playwright/test';

export class NavPom {
    readonly homeLink: Locator;
    readonly todoLink: Locator;

    constructor(public readonly page: Page) {
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.todoLink = page.getByRole('link', { name: 'Todo' });
    }
}
