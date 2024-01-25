import { expect, test as base } from '@playwright/test';
import { TestPom } from './test.pom';

const test = base.extend<{ testPage: TestPom }>({
    testPage: async ({ page, context }, use) => {
        const testPage = new TestPom(page, context);
        await testPage.goto();
        await use(testPage);
    },
});

test('should have link', async ({ testPage }) => {
    await expect(testPage.link).toBeVisible();
});
