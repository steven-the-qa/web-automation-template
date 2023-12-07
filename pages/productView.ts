import BasePage from './generics/page'
import { Page } from '@playwright/test'

export default class ProductViewPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    // Messages
    productNameM = this.message("1989 (Taylor's Version)")

    // Elements
    searchBox = this.element('id', 'twotabsearchtextbox')
    cartCount = this.element('id', 'nav-cart-count')
    productName = this.element('id', 'productTitle')
    productSpecs = this.element('id', 'detailBullets_feature_div')
    addToCartBtn = this.element('id', 'add-to-cart-button')
}