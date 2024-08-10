# Playwright Practice Project

This project demonstrates automated testing using Playwright. It includes both UI and API test cases, with tests executed in parallel on multiple browsers.

## Project Structure

- `tests/` - Contains the test files for both UI and API.
  - `UI/` - Contains UI test cases.
  - `API/` - Contains API test cases.
- `pages/` - Contains page object models for the UI tests.
- `testData/` - Contains test data in JSON format.
- `scripts/` - Contains setup scripts such as authentication state management.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 12.x)
- [Playwright](https://playwright.dev/) (>= 1.18.0)

### Installation

1. Download the zip file:

2. Install dependencies:

    ```sh
    npm install
    ```

### Configuration

The project uses `playwright.config.js` for configuration. Make sure to set the correct base URLs for your UI and API test cases.

```js
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['allure-playwright'],
  ],
  use: {
    trace: 'on-first-retry',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 20000,
    storageState: path.resolve(__dirname, 'scripts', 'authState.json')
  },
  projects: [
    {
      name: 'chromium',
      testDir: './tests/UI',
      use: { ...devices['Desktop Chrome'], 
        baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        actionTimeout: 20000, 
    },
    },
    {
      name: 'firefox',
      testDir: './tests/UI',
      use: { ...devices['Desktop Firefox'],
        baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        actionTimeout: 30000, 
        },
    },
    {
      name: 'API Tests',
      testDir: './tests/API',
      use: { baseURL: 'https://restful-booker.herokuapp.com' }, 
    },
  ],
});


## Running Tests

To run all tests :
    npx playwright test

To run testcases with tags
    npx playwright test --grep "@tagName"

To run testcases in a specifc browser
    npx playwright test --project = chromium

To run the auite using a single config file
    npx playwright test --config=configFileName.config.js
    
To generate allure report after the suite is completed
    allure generate allure-results -o allure-report --clean

TO open the report in browser
    allure open allure-report 