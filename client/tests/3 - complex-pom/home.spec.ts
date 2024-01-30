import { expect, test as base } from '@playwright/test';
import { HomePom } from '../pom/home.pom';
import { NavPom } from '../pom/nav.pom';

const test = base.extend<{ homePage: HomePom, nav: NavPom }>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePom(page);
        await homePage.goto();
        await use(homePage);
    },
    nav: async ({ page }, use) => {
        const nav = new NavPom(page);
        await use(nav);
    },
});

test('should have text and link', async ({ homePage, nav, isMobile }) => {
    // Navigation will not be visible on mobile
    if (!isMobile) {
        await expect(nav.homeLink).toBeVisible();
        await expect(nav.homeLink).toHaveAttribute('href', '/');

        await expect(nav.todoLink).toBeVisible();
        await expect(nav.todoLink).toHaveAttribute('href', '/todo');
    }

    await expect(homePage.text).toBeVisible();
    await expect(homePage.text).toHaveText('Edit src/App.tsx and save to reload.');

    await expect(homePage.link).toBeVisible();
    await expect(homePage.link).toHaveText('Learn React');
    await expect(homePage.link).toHaveAttribute('href', 'https://reactjs.org');
});
