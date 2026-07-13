import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

import { expect, test as setup } from '@playwright/test';

import testData from '../src/data/ui-test-data.json';
import { LoginPage } from '../src/pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(
    testData.validUser.username,
    testData.validUser.password
  );

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');

  await mkdir(dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
