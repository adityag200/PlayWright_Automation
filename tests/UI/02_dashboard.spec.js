// tests/dashboard.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage.js');
const DashboardPage = require('../../pages/DashboardPage.js');
const loginData = require('../../testData/loginData.js');

// Increase the default timeout
test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    console.log("Navigating to site...");
    await loginPage.navigateToSite();
    console.log("Waiting for network to be idle...");
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    // Take a screenshot for debugging
    await page.screenshot({ path: 'before-dashboard.png' });
    console.log("Screenshot taken before dashboard validation");
});

test('verify dashboard after login @smoke', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.validateDashboardHeader();
    await dashboardPage.validateMyActions();
    await dashboardPage.validateDashboardLink();
    await dashboardPage.validateBuzzPost();
    // Take a screenshot for debugging
    await page.screenshot({ path: 'after-dashboard.png' });
    console.log("Screenshot taken after dashboard validation");
});

test('verify the menu present in dashboard @smoke', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.validateSubMenuOptions();
    // Take a screenshot for debugging
    await page.screenshot({ path: 'after-menu-validation.png' });
    console.log("Screenshot taken after menu validation");
});