import { defineConfig } from '@playwright/test';

const AUTH_FILE = 'playwright/.auth/user.json';
const SAUCE_DEMO_URL = 'https://www.saucedemo.com';

export default defineConfig({
  testDir: './tests',

  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }]
  ],

  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'Authentication Setup',
      testMatch: '**/auth.setup.ts',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: SAUCE_DEMO_URL,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    },
    {
      name: 'Google Chrome - UI',
      testMatch: '**/ui/**/*.spec.ts',
      dependencies: ['Authentication Setup'],
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: SAUCE_DEMO_URL,
        storageState: AUTH_FILE,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    },
    {
      name: 'Mozilla Firefox - UI',
      testMatch: '**/ui/**/*.spec.ts',
      dependencies: ['Authentication Setup'],
      use: {
        browserName: 'firefox',
        baseURL: SAUCE_DEMO_URL,
        storageState: AUTH_FILE,
        viewport: null,
        launchOptions: {
          args: ['--kiosk']
        }
      }
    },
    {
      name: 'Simple Books API',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: 'https://simple-books-api.click'
      }
    }
  ]
});
