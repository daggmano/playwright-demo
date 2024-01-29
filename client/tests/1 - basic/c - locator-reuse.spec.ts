import { expect, test } from '@playwright/test';

test('should have link with correct attributes and text', async ({ page }) => {
    await page.goto('/');

    const link = page.locator('[data-test-id=learn-react-link]');

    await expect(link).toBeVisible();
    await expect(link).toHaveText('Learn React');
    await expect(link).toHaveAttribute('href', 'https://reactjs.org');
});
