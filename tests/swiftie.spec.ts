import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import type { TestInfo } from '@playwright/test';
const { screenshot } = require('../utils')()
import SearchResultsPage from '../pages/searchResults';
import ProductViewPage from '../pages/productView';
import ProductSpecsSection from '../pages/sections/productSpecs';
import AddedToCartConfirmationPage from '../pages/addedToCart';

test.describe('T Swift 1989 Album', async () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let foundName: string;
    let foundASIN: string;
    let ProductView: ProductViewPage;
    let SearchResults: SearchResultsPage;
    let ProductSpecs: ProductSpecsSection;
    let AddedToCartConfirmation: AddedToCartConfirmationPage;

    async function newSearch(searchPhrase: string) {
        ProductView = new ProductViewPage(page)
        await (await ProductView.searchBox).fill(searchPhrase)
        await page.keyboard.press('Enter')
    }

    test.beforeEach(async () => {
        // For Debugging Only: Do not push uncommented
        // browser = await chromium.launch({ headless: false });
        // For CI
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.amazon.com/1989-Taylors-Version-Taylor-Swift/dp/B0CFM76QSG?content-id=amzn1.sym.cb9c3293-7215-4d97-8c71-e1fed9b4d8f1&pd_rd_i=B0CFM76QSG&pd_rd_r=180b3bdc-c298-4f86-bb91-4ef0c80d1cb8&pd_rd_w=tHKD5&pd_rd_wg=kJ0QW&pf_rd_p=cb9c3293-7215-4d97-8c71-e1fed9b4d8f1&pf_rd_r=V7JWQ7ZF2DB34CY3VM1V&ref_=Oct_d_onr_d_5174_2')
        await page.waitForLoadState('domcontentloaded')
    })

    test.afterEach(async ({}, testInfo: TestInfo) => {
        await screenshot(page, testInfo.title)
        await page.close()
        await context.close()
        await browser.close();
    })

    test('Can find T Swift album by product name and view details page', async () => {
        ProductView = new ProductViewPage(page)
        foundName = await (await ProductView.productName).textContent() ?? ''
        await newSearch(foundName)
        await page.waitForLoadState('domcontentloaded')
        SearchResults = new SearchResultsPage(page)
        await expect(await SearchResults.firstResult).toHaveText(SearchResults.firstResultM)
        await (await SearchResults.firstResultLink).click()
        await page.waitForLoadState('domcontentloaded')
        await expect(await ProductView.productName).toHaveText(ProductView.productNameM)
    })

    test('ASIN is correct', async () => {
        ProductView = new ProductViewPage(page)
        ProductSpecs = new ProductSpecsSection(await ProductView.productSpecs)
        foundASIN = await (await ProductSpecs.asin).textContent() ?? ''
        expect(foundASIN).toEqual(ProductSpecs.asinM)
    })

    test('Can find T Swift album by ASIN', async () => {
        ProductView = new ProductViewPage(page)
        ProductSpecs = new ProductSpecsSection(await ProductView.productSpecs)
        await newSearch(foundASIN)
        await page.waitForLoadState('domcontentloaded')
        SearchResults = new SearchResultsPage(page)
        await expect(await SearchResults.firstResult).toHaveText(SearchResults.firstResultM)
        await (await SearchResults.firstResultLink).click()
        await page.waitForLoadState('domcontentloaded')
        await expect(await ProductView.productName).toHaveText(ProductView.productNameM)
    })

    test('T Swift album can be added to cart', async () => {
        ProductView = new ProductViewPage(page)
        await expect(await ProductView.cartCount).toHaveText('0')
        await (await ProductView.addToCartBtn).click()
        await page.waitForLoadState('domcontentloaded')
        AddedToCartConfirmation = new AddedToCartConfirmationPage(page)
        await expect(await AddedToCartConfirmation.addedToCart).toContainText(AddedToCartConfirmation.addedToCartM)
        await expect(await ProductView.cartCount).toHaveText('1')
    })
})