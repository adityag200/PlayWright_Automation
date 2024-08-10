const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const LoginPage = require('../../pages/LoginPage.js');
const AddEmployeePIMPage = require('../../pages/AddEmployeePIM_Page.js');
const addEmployeeData = require('../../testData/addEmployee.js');

// Increase the default timeout
test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    allure.step('Navigating to site...', async () => {
        console.log("Navigating to site...");
        await loginPage.navigateToSite();
    });
    allure.step('Waiting for network to be idle...', async () => {
        console.log("Waiting for network to be idle...");
        await page.waitForLoadState('networkidle', { timeout: 30000 });
    });
    allure.step('Taking a screenshot before dashboard validation', async () => {
        await page.screenshot({ path: 'before-dashboard.png' });
        console.log("Screenshot taken before dashboard validation");
    });
});

test('create and validate employee @fourth', async ({ page }) => {
    const addEmployeePIM = new AddEmployeePIMPage(page);

    allure.step('Navigating to PIM...', async () => {
        await addEmployeePIM.navigateToPIM();
    });

    allure.step('Adding a new employee...', async () => {
        await addEmployeePIM.addEmployee();
    });

    allure.step('Filling employee details...', async () => {
        await addEmployeePIM.fillEmployeeDetails(addEmployeeData.firstName, addEmployeeData.lastName, addEmployeeData.username, addEmployeeData.password);
    });

    allure.step('Waiting for 10 seconds before checking the created employee...', async () => {
        await new Promise(resolve => setTimeout(resolve, 10000));
    });

    allure.step('Checking the created employee...', async () => {
        await addEmployeePIM.checkCreatedEmployee(addEmployeeData.firstName);
    });
});
