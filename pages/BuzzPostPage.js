const { expect } = require('@playwright/test');

class BuzzPostPage {
    constructor(page) {
        this.page = page;
        this.buzzMenu = page.locator("xpath=//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'][normalize-space()='Buzz']");
        this.inputField = page.locator("xpath=//textarea[@placeholder=\"What's on your mind?\"]");
        this.postBtn = page.locator("xpath=//button[@type='submit']");
    }

    async navigateToBuzz() {
        console.log("Navigating to Buzz menu...");
        // Wait for the Buzz menu to be visible and clickable
        await this.buzzMenu.waitFor({ state: 'visible', timeout: 50000 });
        await this.buzzMenu.click();
        console.log("Navigation to Buzz menu complete.");
    }

    async postBuzz(message) {
        console.log("Filling in buzz message...");
        await this.inputField.fill(message);
        console.log("Buzz message filled.");

        console.log("Clicking post button...");
        await this.postBtn.click();
        console.log("Post button clicked.");
    }

    async validateBuzzPost(message) {
        console.log("Validating buzz post...");
        const buzzPost = this.page.locator(`text=${message}`).first();
        await buzzPost.waitFor({ state: 'visible', timeout: 30000 });
        const buzzText = await buzzPost.textContent();
        console.log("Buzz post: " + buzzText);
        expect(buzzText).toContain(message);
        console.log("Buzz post validation complete.");
    }
}

module.exports = BuzzPostPage;
