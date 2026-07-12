import { defineConfig } from '@playwright/test';

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
      name: 'Google Chrome - UI',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: 'https://www.saucedemo.com',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    },
    {
      name: 'Mozilla Firefox - UI',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        browserName: 'firefox',
        baseURL: 'https://www.saucedemo.com',
        viewport: null
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
