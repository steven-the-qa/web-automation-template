import BasePage from './generics/page'
import { Page } from '@playwright/test'

export default class ProductViewPage extends BasePage {
    constructor(public readonly page: Page) {
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

    async goto() {
        await this.page.goto('https://www.amazon.com/1989-Taylors-Version-Taylor-Swift/dp/B0CFM76QSG?content-id=amzn1.sym.cb9c3293-7215-4d97-8c71-e1fed9b4d8f1&pd_rd_i=B0CFM76QSG&pd_rd_r=180b3bdc-c298-4f86-bb91-4ef0c80d1cb8&pd_rd_w=tHKD5&pd_rd_wg=kJ0QW&pf_rd_p=cb9c3293-7215-4d97-8c71-e1fed9b4d8f1&pf_rd_r=V7JWQ7ZF2DB34CY3VM1V&ref_=Oct_d_onr_d_5174_2')
        await this.page.waitForLoadState('domcontentloaded')
    }

    async newSearch(searchPhrase: string) {
        await (await this.searchBox).fill(searchPhrase)
        await this.page.keyboard.press('Enter')
    }
}