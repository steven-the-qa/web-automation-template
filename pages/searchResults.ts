import BasePage from './generics/page'
import { Page } from '@playwright/test'

export default class SearchResultsPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    // Messages
    firstResultM = this.message("1989 (Taylor's Version)")

    // Elements
    firstResult = this.element('xpath', '//div[@data-cy="title-recipe"]/h2')
    firstResultLink = this.element('xpath', '//div[@data-cy="title-recipe"]/h2/a')
}