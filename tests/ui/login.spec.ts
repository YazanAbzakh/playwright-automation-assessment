import testData from '../../src/data/ui-test-data.json';
import { expect, test } from '../../src/fixtures/testFixtures';

test.use({
  storageState: {
    cookies: [],
    origins: []
  }
});

test.describe('SauceDemo Login', () => {
  test(
    'TC_UI_001 - Valid Login',
    async ({ page, loginPage }) => {
      await loginPage.navigate();

      await loginPage.login(
        testData.validUser.username,
        testData.validUser.password
      );

      await expect(page).toHaveURL(/\/inventory\.html$/);

      await expect(
        page.locator('[data-test="title"]')
      ).toHaveText('Products');
    }
  );

  for (const scenario of testData.invalidLoginScenarios) {
    test(
      `TC_UI_002 - ${scenario.name}`,
      async ({ loginPage }) => {
        await loginPage.navigate();

        await loginPage.login(
          scenario.username,
          scenario.password
        );

        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toHaveText(
          scenario.expectedError
        );
      }
    );
  }
});
