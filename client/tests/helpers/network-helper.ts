import { Page, Request } from '@playwright/test';

export const waitForAndFulfillRequest = async (page: Page, method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, jsonResult: any): Promise<Request> => {
    const requestPromise = page.waitForRequest((req) => req.url() === url && req.method() === method);

    await page.route(url, async (route) => {
        if (route.request().method() !== method) {
            await route.fallback();
            return;
        }

        await route.fulfill({ json: jsonResult });
    });

    return requestPromise;
};
