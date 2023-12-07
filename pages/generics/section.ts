import { Locator } from '@playwright/test';
import BaseGeneric from './base';

export default class BaseSection extends BaseGeneric {
  constructor(base: Locator) {
    super(base)
  }
}