import BasePage from './generics/page'
import { Page } from '@playwright/test'

export default class AddedToCartConfirmationPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    // Messages
    addedToCartM = this.message('Added to Cart')

    // Elements
    addedToCart = this.element('id', 'NATC_SMART_WAGON_CONF_MSG_SUCCESS')
}