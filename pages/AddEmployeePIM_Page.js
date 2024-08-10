const { expect } = require('@playwright/test');

class AddEmployeePIM_Page {
    constructor(page) {
        this.page = page;
        this.PIM_MenuOption = page.locator("xpath=//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'][normalize-space()='PIM']");
        this.addButton = page.locator("xpath=//button[normalize-space()='Add']");
        this.firstname = page.locator("xpath=//input[@placeholder='First Name']");
        this.lastname = page.locator("xpath=//input[@placeholder='Last Name']");
        this.employeeID = page.locator("xpath=(//input[@class='oxd-input oxd-input--active'])[2]");
        this.saveBtn = page.locator("xpath=//button[normalize-space()='Save']");
        this.successMsg = page.locator("xpath= //p[@class='oxd-text oxd-text--p oxd-text--toast-title oxd-toast-content-text']");
        this.clickOnEmployeeList = page.locator("xpath=//a[normalize-space()='Employee List']");
    }

    async navigateToPIM() {
        console.log("Navigating to PIM menu...");
        await this.PIM_MenuOption.click();
        console.log("Navigation to PIM menu complete.");
    }

    async addEmployee() {
        console.log("Clicking on Add button...");
        await this.addButton.click();
        console.log("Add button clicked.");
    }

    async fillEmployeeDetails(firstName, lastName, username, password) {
        console.log("Filling in first name...");
        await this.firstname.fill(firstName);
        console.log("First name filled.");

        console.log("Filling in last name...");
        await this.lastname.fill(lastName);
        console.log("Last name filled.");

        console.log("Clicking save button...");
        await this.saveBtn.click();

        console.log("Waiting for success message...");
        await this.successMsg.waitFor({ state: 'visible', timeout: 30000 });
        const successMessage = await this.successMsg.textContent();
        console.log("Success message: " + successMessage);

        this.employeeIDValue = await this.employeeID.inputValue();
        console.log("Employee ID: " + this.employeeIDValue);

        this.firstName = firstName;
    }

    async checkCreatedEmployee(empFirstname) {
        console.log("Clicking on Employee List...");
        await this.clickOnEmployeeList.click();
        console.log("Employee List clicked.");

        // const findEmployee = this.page.locator(`xpath=//div[normalize-space()='${empFirstname}']`);
        const findEmployee = this.page.getByText(empFirstname).first();
        await findEmployee.waitFor({ state: 'visible', timeout: 50000 });
        const employeeText = await findEmployee.textContent();
        console.log("findEmployee: " + employeeText);

        await findEmployee.scrollIntoViewIfNeeded();
        await expect(findEmployee).toBeVisible();
        console.log("Employee found in the list.");
    }
}

module.exports = AddEmployeePIM_Page;
