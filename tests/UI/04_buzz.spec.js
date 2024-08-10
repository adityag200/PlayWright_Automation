const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage.js');
const BuzzPostPage = require('../../pages/BuzzPostPage.js');
const postData = require('../../testData/postData.js');

// Increase the default timeout
test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    console.log("Navigating to site...");
    await loginPage.navigateToSite();
    console.log("Waiting for network to be idle...");
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    await page.screenshot({ path: 'before-dashboard.png' });
    console.log("Screenshot taken before dashboard validation");
});

// Helper function to introduce a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

test('adding a buzz post @fifth', async ({ page }) => {
    const buzzPost = new BuzzPostPage(page);
    await buzzPost.navigateToBuzz();
    await buzzPost.postBuzz(postData.postData);

    // Introduce a delay before validating the post
    await delay(3000);
    
    await buzzPost.validateBuzzPost(postData.postData);
});
