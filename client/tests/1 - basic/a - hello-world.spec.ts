import { expect, test } from '@playwright/test';

test('should have expected text', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Edit src/App.tsx and save to reload.')).toBeVisible();
});
