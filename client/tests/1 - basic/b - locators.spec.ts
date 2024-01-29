import { expect, test } from '@playwright/test';

test('should have expected text using locator', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[data-test-id=display-text]')).toBeVisible();
    await expect(page.locator('[data-test-id=display-text]')).toHaveText('Edit src/App.tsx and save to reload.');
});
