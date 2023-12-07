import BaseSection from '../generics/section';
import { Locator } from '@playwright/test'

export default class ProductSpecsSection extends BaseSection {
    constructor(root: Locator) {
        super(root)
    }

    // Messages
    asinM = this.message('B0CFM76QSG')

    // Elements
    asin = this.element('xpath', "//span[contains(text(), 'ASIN')]/following-sibling::span")
}