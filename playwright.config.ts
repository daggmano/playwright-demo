import { defineConfig } from '@playwright/test';

export default defineConfig({
    fullyParallel: true,
    reporter: 'html',
    testDir: './tests',
    testIgnore: '**/*.pom.ts',
    testMatch: '**/*.spec.ts',
    webServer: {
        command: 'yarn start',
        url: 'http://localhost:3000',
    },
    use: {
        baseURL: 'http://localhost:3000',
    },
});
