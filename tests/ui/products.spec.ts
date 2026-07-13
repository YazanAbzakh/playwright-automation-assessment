import { expect, test } from '../../src/fixtures/testFixtures';

test.describe('SauceDemo Products', () => {
  test(
    'TC_UI_003 - Verify Products Sorted in Descending Alphabetical Order',
    async ({ productsPage }) => {
      await productsPage.navigate();

      await expect(productsPage.pageTitle).toHaveText('Products');

      await productsPage.sortByNameDescending();

      const displayedProductNames =
        await productsPage.getDisplayedProductNames();

      const expectedProductNames = [...displayedProductNames].sort(
        (firstName, secondName) =>
          secondName.localeCompare(firstName, 'en')
      );

      expect(displayedProductNames).toEqual(expectedProductNames);
    }
  );
});
