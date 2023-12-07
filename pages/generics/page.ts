import { Page } from '@playwright/test';
import BaseGeneric from './base'

export default class BasePage extends BaseGeneric {
  constructor(base: Page) {
    super(base)
  }
}