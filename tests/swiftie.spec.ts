import { test, expect, chromium, Browser, BrowserContext, Page, Locator, TestInfo } from '@playwright/test';

test.describe('Janus AI - Amazon Challenge', async () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let productASIN: string;
    const productTitle: string = "1989 (Taylor's Version)"
    const correctASIN: string = 'B0CFM76QSG'

    async function newSearch(searchPhrase: string) {
        const searchBox: Locator = await page.getByTestId('twotabsearchtextbox')
        await searchBox.fill(searchPhrase)
        await page.keyboard.press('Enter')
    }

    test.beforeEach(async () => {
        // For Debugging Only
        browser = await chromium.launch({ headless: false });
        // browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.amazon.com/1989-Taylors-Version-Taylor-Swift/dp/B0CFM76QSG?content-id=amzn1.sym.cb9c3293-7215-4d97-8c71-e1fed9b4d8f1&pd_rd_i=B0CFM76QSG&pd_rd_r=180b3bdc-c298-4f86-bb91-4ef0c80d1cb8&pd_rd_w=tHKD5&pd_rd_wg=kJ0QW&pf_rd_p=cb9c3293-7215-4d97-8c71-e1fed9b4d8f1&pf_rd_r=V7JWQ7ZF2DB34CY3VM1V&ref_=Oct_d_onr_d_5174_2')
        await page.waitForLoadState('domcontentloaded')
    })

    test.afterEach(async () => {
        await page.close()
        await context.close()
        await browser.close();
    })

    test('Can find T Swift album by product name and view details page', async () => {
        await newSearch(productTitle)
        await page.waitForLoadState('domcontentloaded')
        const firstSearchResult: Locator = await page.locator('//div[@data-cy="title-recipe"]/h2').first()
        await expect(firstSearchResult).toHaveText("1989 (Taylor's Version)")
        await firstSearchResult.locator('a').click()
        await page.waitForLoadState('domcontentloaded')
        await expect(await page.getByTestId('productTitle')).toHaveText("1989 (Taylor's Version)")
    })

    test('ASIN is correct', async () => {
        const productASINSpan: Locator = await page.getByTestId('detailBullets_feature_div').locator("//span[contains(text(), 'ASIN')]/following-sibling::span")
        productASIN = await productASINSpan.textContent() ?? ''
        await expect(productASIN).toEqual(correctASIN)
    })

    test('Can find T Swift album by ASIN', async () => {
        await newSearch(productASIN)
        await page.waitForLoadState('domcontentloaded')
        const firstSearchResult: Locator = await page.locator('//div[@data-cy="title-recipe"]/h2').first()
        await expect(firstSearchResult).toHaveText("1989 (Taylor's Version)")
        await firstSearchResult.locator('a').click()
        await page.waitForLoadState('domcontentloaded')
        await expect(await page.getByTestId('productTitle')).toHaveText("1989 (Taylor's Version)")
    })

    test('T Swift album can be added to cart', async () => {
        const cartCount: Locator = await page.getByTestId('nav-cart-count')
        const addToCartBtn: Locator = await page.getByTestId('add-to-cart-button')
        const addedToCartConfirmation: Locator = await page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS')

        await expect(cartCount).toHaveText('0')
        await addToCartBtn.click()
        await page.waitForLoadState('domcontentloaded')
        await expect(addedToCartConfirmation).toContainText('Added to Cart')
        await expect(cartCount).toHaveText('1')
    })
})