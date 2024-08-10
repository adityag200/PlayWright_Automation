// pages/LoginPage.js
const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        // Ensure these selectors are correct
        this.userName = page.locator('input[name="username"]');  // Update selector if necessary
        this.password = page.locator('input[name="password"]');  // Update selector if necessary
        this.loginButton = page.locator('button[type="submit"]');  // Update selector if necessary
        this.dashboardPageHeader = page.locator('h6:has-text("Dashboard")');  // Update selector if necessary
    }

    async navigateToSite() {
        console.log("Navigating to login page URL...");
        await this.page.goto('/', { waitUntil: 'networkidle' });
        console.log("Navigation to login page complete.");
    }

    async login(username, password) {
        console.log("Filling in username...");
        await this.userName.fill(username);
        console.log("Filling in password...");
        await this.password.fill(password);
        console.log("Clicking login button...");
        await this.loginButton.click();
        console.log("Login button clicked.");
    }

    async validateLogin() {
        // Added error handling
        try {
            console.log("Waiting for dashboard header to be visible...");
            await expect(this.dashboardPageHeader).toBeVisible({ timeout: 10000 });
            await expect(this.dashboardPageHeader).toHaveText('Dashboard');
            console.log("Dashboard header validation completed.");
        } catch (error) {
            console.error("Dashboard header validation failed:", error.message);
            throw error; // Re-throw error to fail the test
        }
    }
}

module.exports = LoginPage;