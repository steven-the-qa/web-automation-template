import { test as base, Locator } from '@playwright/test';
import type { TestInfo } from '@playwright/test';
import ProductViewPage from '../pages/productView';
import SearchResultsPage from '../pages/searchResults';
import AddedToCartPage from '../pages/addedToCart';
import ProductSpecsSection from '../pages/sections/productSpecs';
const { screenshot } = require('../utils')()

type MyFixtures = {
    productViewPage: ProductViewPage;
    searchResultsPage: SearchResultsPage;
    productSpecsSection: ProductSpecsSection;
    addedToCartPage: AddedToCartPage;
}

export const test = base.extend<MyFixtures>({
    productViewPage: async ({ page }, use, testInfo: TestInfo) => {
        const productViewPage: ProductViewPage = new ProductViewPage(page);
        await productViewPage.goto();
        await use(productViewPage);
        await screenshot(page, `${testInfo.title} - productView`)
    },
    searchResultsPage: async ({ page }, use, testInfo: TestInfo) => {
        const searchResultsPage: SearchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
        await screenshot(page, `${testInfo.title} - searchResults`)
    },
    productSpecsSection: async ({ page }, use, testInfo: TestInfo) => {
        const productViewPage: ProductViewPage = new ProductViewPage(page);
        await productViewPage.goto();
        const productSpecs: Locator = await productViewPage.productSpecs;
        const productSpecsSection: ProductSpecsSection = new ProductSpecsSection(productSpecs);
        await use(productSpecsSection);
    },
    addedToCartPage: async ({ page }, use, testInfo: TestInfo) => {
        const addedToCartPage: AddedToCartPage = new AddedToCartPage(page);
        await use(addedToCartPage);
        await screenshot(page, `${testInfo.title} - addedToCart`)
    },
})

export { expect } from '@playwright/test';