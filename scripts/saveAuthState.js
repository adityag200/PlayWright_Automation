const { chromium } = require('@playwright/test');
const loginData = require('../testData/loginData');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: false }); // Change to false for debugging
    const context = await browser.newContext();

    const page = await context.newPage();
    
    // Navigate to the login page
    console.log('Navigating to login page...');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'networkidle' });
    
    // Perform login
    console.log('Logging in...');
    await page.fill('input[name="username"]', loginData.username); // Use the correct selector
    await page.fill('input[name="password"]', loginData.password); // Use the correct selector
    
    // Corrected selector for the login button
    const loginButtonSelector = 'button[type="submit"]'; // Update this selector based on your page's HTML
    await page.click(loginButtonSelector); // Click the login button
    
    // Wait for successful login
    console.log('Waiting for successful login...');
    try {
        // Update this selector to a valid element that confirms a successful login
        await page.waitForSelector('//h6[normalize-space()="Dashboard"]', { state: 'visible', timeout: 60000 });
        console.log('Login successful.');
    } catch (error) {
        console.error('Login failed or timeout occurred.');
        await browser.close();
        process.exit(1);
    }

    // Save authentication state
    const authStatePath = path.resolve(__dirname, 'authState.json');
    await context.storageState({ path: authStatePath });

    console.log(`Authentication state saved to ${authStatePath}`);
    
    await browser.close();
})();
