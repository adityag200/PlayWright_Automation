// // @ts-check
// const { defineConfig, devices } = require('@playwright/test');
// const path = require('path');

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// /**
//  * @see https://playwright.dev/docs/test-configuration
//  */
// module.exports = defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('/')`. */
//     baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     trace: 'on-first-retry',
//     /* Use the saved authentication state */
//     storageState: path.resolve(__dirname, 'scripts', 'authState.json'), // Adjust path as needed
//     headless: true, // Set to true if you want to run tests in headless mode
//     viewport: { width: 1280, height: 720 }, // Default viewport size
//     actionTimeout: 10000, // Timeout for each action
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://127.0.0.1:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });


// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright']
],
  use: {
    trace: 'on-first-retry',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 20000,
    /* Use the saved authentication state */
    storageState: path.resolve(__dirname, 'scripts', 'authState.json')
  },
  projects: [
    {
      name: 'chromium',
      testDir: './tests/UI',
      use: { ...devices['Desktop Chrome'], 
        baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        actionTimeout: 20000, // Timeout for each action
        retries: 1, // Retry failed tests once
    },
    },
    {
      name: 'firefox',
      testDir: './tests/UI',
      use: { ...devices['Desktop Firefox'],
        baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        actionTimeout: 30000, // Timeout for each action
        retries: 1, // Retry failed tests once
        },
    },
    {
      name: 'API Tests',
      testDir: './tests/API',
      use: { baseURL: 'https://restful-booker.herokuapp.com' }, // Base URL for API tests
    },
  ],
});
