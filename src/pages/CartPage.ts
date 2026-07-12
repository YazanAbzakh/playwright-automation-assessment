import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getCartItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
