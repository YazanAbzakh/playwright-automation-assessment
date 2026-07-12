import type { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly overviewItemPrices: Locator;
  readonly itemTotalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.overviewItemPrices = page.locator(
      '[data-test="inventory-item-price"]'
    );
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async getOverviewItemPrices(): Promise<number[]> {
    const priceTexts = await this.overviewItemPrices.allTextContents();

    return priceTexts.map((priceText) =>
      this.parseCurrency(priceText)
    );
  }

  async getDisplayedItemTotal(): Promise<number> {
    const itemTotalText = await this.itemTotalLabel.textContent();

    if (!itemTotalText) {
      throw new Error('The checkout item total is missing.');
    }

    return this.parseCurrency(itemTotalText);
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  private parseCurrency(value: string): number {
    const parsedValue = Number.parseFloat(
      value.replace(/[^0-9.-]+/g, '')
    );

    if (Number.isNaN(parsedValue)) {
      throw new Error(`Unable to parse currency value: "${value}".`);
    }

    return parsedValue;
  }
}
