import { type BrowserContext, type Locator, type Page } from '@playwright/test';

export class TestPom {
    readonly link: Locator;

    constructor(public readonly page: Page, public readonly context: BrowserContext) {
        this.link = page.locator('a.App-link');
    }

    async goto() {
        await this.page.goto('/');
    }
}