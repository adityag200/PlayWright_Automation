// playwright.api.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/api', // Directory containing your API tests
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL for API requests */
    baseURL: 'https://restful-booker.herokuapp.com',

    /* Timeout for each API request */
    actionTimeout: 10000, // Adjust as needed

    /* Optionally, you can configure additional settings such as headers, cookies, etc. */
  },

  /* Configure projects for major browsers (if needed) */
  projects: [
    {
      name: 'api-tests',
      use: {
        /* No browser context needed for API tests */
      },
    },
  ],
});
