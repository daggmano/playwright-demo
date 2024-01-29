import { expect, test as base } from '@playwright/test';
import { HomePom } from '../pom/home.pom';

const test = base.extend<{ homePage: HomePom }>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePom(page);
        await homePage.goto();
        await use(homePage);
    },
});

test('should have text and link', async ({ homePage }) => {
    await expect(homePage.text).toBeVisible();
    await expect(homePage.text).toHaveText('Edit src/App.tsx and save to reload.');

    await expect(homePage.link).toBeVisible();
    await expect(homePage.link).toHaveText('Learn React');
    await expect(homePage.link).toHaveAttribute('href', 'https://reactjs.org');
});
