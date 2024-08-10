// tests/example.spec.js
const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const LoginPage = require('../../pages/LoginPage');
const loginData = require('../../testData/loginData');

test.beforeEach(async ({ page }) => {
    allure.step('Navigate to login page', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToSite();
        allure.attachment('Login Page Screenshot', await page.screenshot(), 'image/png');
    });
});

test('login test', async ({ page }) => {
    allure.epic('Login Tests');
    allure.feature('User Authentication');
    allure.story('User Login');

    const loginPage = new LoginPage(page);
    
    allure.step('Validate user login', async () => {
        await loginPage.validateLogin();
        allure.attachment('Login Successful Screenshot', await page.screenshot(), 'image/png');
    });
});
