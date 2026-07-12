import testData from '../../src/data/ui-test-data.json';
import { expect, test } from '../../src/fixtures/testFixtures';

test.describe('SauceDemo Checkout', () => {
  test(
    'TC_UI_004 - End-to-End Checkout Flow',
    async ({
      page,
      loginPage,
      productsPage,
      cartPage,
      checkoutPage,
      checkoutCompletePage
    }) => {
      await loginPage.navigate();
      await loginPage.login(
        testData.validUser.username,
        testData.validUser.password
      );

      await expect(productsPage.pageTitle).toHaveText('Products');

      const availableProducts =
        await productsPage.getProductSummaries();

      expect(availableProducts.length).toBeGreaterThanOrEqual(2);

      const twoMostExpensiveProducts = [...availableProducts]
        .sort(
          (firstProduct, secondProduct) =>
            secondProduct.price - firstProduct.price
        )
        .slice(0, 2);

      for (const product of twoMostExpensiveProducts) {
        await productsPage.addProductToCartByName(product.name);
      }

      await productsPage.openCart();

      await expect(cartPage.pageTitle).toHaveText('Your Cart');
      await expect(cartPage.cartItems).toHaveCount(2);

      const cartItemNames = await cartPage.getCartItemNames();
      const expectedProductNames = twoMostExpensiveProducts.map(
        (product) => product.name
      );

      expect(cartItemNames).toEqual(
        expect.arrayContaining(expectedProductNames)
      );

      await cartPage.proceedToCheckout();

      await checkoutPage.fillCheckoutInformation(
        testData.checkoutCustomer.firstName,
        testData.checkoutCustomer.lastName,
        testData.checkoutCustomer.postalCode
      );

      await checkoutPage.continueToOverview();

      const overviewItemPrices =
        await checkoutPage.getOverviewItemPrices();

      expect(overviewItemPrices).toHaveLength(2);

      const expectedProductPrices = twoMostExpensiveProducts
        .map((product) => product.price)
        .sort((firstPrice, secondPrice) => firstPrice - secondPrice);

      const displayedProductPrices = [...overviewItemPrices].sort(
        (firstPrice, secondPrice) => firstPrice - secondPrice
      );

      expect(displayedProductPrices).toEqual(expectedProductPrices);

      const calculatedItemTotal = overviewItemPrices.reduce(
        (runningTotal, itemPrice) => runningTotal + itemPrice,
        0
      );

      const displayedItemTotal =
        await checkoutPage.getDisplayedItemTotal();

      expect(displayedItemTotal).toBeCloseTo(
        calculatedItemTotal,
        2
      );

      await checkoutPage.finishOrder();

      await expect(page).toHaveURL(/\/checkout-complete\.html$/);

      await expect(
        checkoutCompletePage.confirmationHeading
      ).toHaveText('Thank you for your order!');

      await expect(
        checkoutCompletePage.confirmationMessage
      ).toHaveText(
        'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
      );
    }
  );
});
