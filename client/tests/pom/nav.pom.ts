import { type Locator, type Page } from '@playwright/test';

export class NavPom {
    readonly homeLink: Locator;
    readonly todoLink: Locator;

    constructor(public readonly page: Page) {
        const navList = page.locator('nav.navbar ul');

        this.homeLink = navList.locator('a', { hasText: 'Home' });
        this.todoLink = navList.locator('a', { hasText: 'Todo' });
    }
}
