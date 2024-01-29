import { type Locator, type Page } from '@playwright/test';

export class HomePom {
    readonly text: Locator;
    readonly link: Locator;

    constructor(public readonly page: Page) {
        this.text = page.locator('[data-test-id=display-text]');
        this.link = page.locator('[data-test-id=learn-react-link]');
    }

    async goto() {
        await this.page.goto('/');
    }
}
