import { test, expect } from '../fixtures/swiftie';

test.describe('T Swift 1989 Album', async () => {
    let foundName: string;
    let foundASIN: string;

    test('Can find T Swift album by product name and view details page', async ({ page, productViewPage, searchResultsPage }) => {
        foundName = await (await productViewPage.productName).textContent() ?? ''
        await productViewPage.newSearch(foundName)
        await page.waitForLoadState('domcontentloaded')
        await expect(await searchResultsPage.firstResult).toHaveText(searchResultsPage.firstResultM)
        await (await searchResultsPage.firstResultLink).click()
        await page.waitForLoadState('domcontentloaded')
        await expect(await productViewPage.productName).toHaveText(productViewPage.productNameM)
    })

    test('ASIN is correct', async ({ page, productSpecsSection }) => {
        foundASIN = await (await productSpecsSection.asin).textContent() ?? ''
        expect(foundASIN).toEqual(productSpecsSection.asinM)
    })

    test('Can find T Swift album by ASIN', async ({ page, productViewPage, searchResultsPage }) => {
        await productViewPage.newSearch(foundASIN)
        await page.waitForLoadState('domcontentloaded')
        await expect(await searchResultsPage.firstResult).toHaveText(searchResultsPage.firstResultM)
        await (await searchResultsPage.firstResultLink).click()
        await page.waitForLoadState('domcontentloaded')
        await expect(await productViewPage.productName).toHaveText(productViewPage.productNameM)
    })

    test('T Swift album can be added to cart', async ({ page, productViewPage, addedToCartPage }) => {
        await expect(await productViewPage.cartCount).toHaveText('0')
        await (await productViewPage.addToCartBtn).click()
        await page.waitForLoadState('domcontentloaded')
        await expect(await addedToCartPage.addedToCart).toContainText(addedToCartPage.addedToCartM)
        await expect(await productViewPage.cartCount).toHaveText('1')
    })
})