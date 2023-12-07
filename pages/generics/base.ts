import { Page, Locator } from '@playwright/test';
import { LocatorStrategy } from '../../types';
const { id, xpath } = LocatorStrategy;

export default class BaseGeneric {
  readonly base: Page | Locator;
  constructor(base: Page | Locator) {
    this.base = base
  }

  async element(strategy: string, selector: string): Promise<Locator> {
    switch(strategy) {
      case id:
        return this.base.getByTestId(selector)
      case xpath:
        return this.base.locator(selector).first()
      default:
        throw Error('Not a valid locator strategy')
    }
  }

  message(message: string): string {
    return message
  }
}