import type { Locator, Page } from '@playwright/test';

export interface ProductSummary {
  name: string;
  price: number;
}

export class ProductsPage {
  private readonly page: Page;
  private readonly inventoryItems: Locator;

  readonly pageTitle: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.pageTitle = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );
    this.productNames = page.locator(
      '[data-test="inventory-item-name"]'
    );
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  async sortByNameDescending(): Promise<void> {
    await this.sortDropdown.selectOption('za');
  }

  async getDisplayedProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductSummaries(): Promise<ProductSummary[]> {
    const productCount = await this.inventoryItems.count();
    const products: ProductSummary[] = [];

    for (let index = 0; index < productCount; index += 1) {
      const productItem = this.inventoryItems.nth(index);

      const productName = (
        await productItem
          .locator('[data-test="inventory-item-name"]')
          .textContent()
      )?.trim();

      const priceText = (
        await productItem
          .locator('[data-test="inventory-item-price"]')
          .textContent()
      )?.trim();

      if (!productName || !priceText) {
        throw new Error(
          `Product data is missing for inventory item at index ${index}.`
        );
      }

      const price = Number.parseFloat(priceText.replace('$', ''));

      if (Number.isNaN(price)) {
        throw new Error(
          `Product "${productName}" has an invalid price: "${priceText}".`
        );
      }

      products.push({
        name: productName,
        price
      });
    }

    return products;
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const productNameLocator = this.page.getByText(productName, {
      exact: true
    });

    const productItem = this.inventoryItems.filter({
      has: productNameLocator
    });

    await productItem
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
