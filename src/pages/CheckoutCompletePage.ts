import type { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly confirmationHeading: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.confirmationHeading = page.locator(
      '[data-test="complete-header"]'
    );
    this.confirmationMessage = page.locator(
      '[data-test="complete-text"]'
    );
  }
}
