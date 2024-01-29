import { expect, test } from '@playwright/test';

test('should have text and link', async ({ page }) => {
    const text = page.locator('[data-test-id=display-text]');
    const link = page.locator('[data-test-id=learn-react-link]');

    await page.goto('/');

    await expect(text).toBeVisible();
    await expect(text).toHaveText('Edit src/App.tsx and save to reload.');

    await expect(link).toBeVisible();
    await expect(link).toHaveText('Learn React');
    await expect(link).toHaveAttribute('href', 'https://reactjs.org');
})
