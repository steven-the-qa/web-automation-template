import type { Page } from 'playwright'
import * as fs from 'fs'

exports.saveHTML = async (page: Page, fileName: string) => {
    const pageSource = await page.content()
    await fs.promises.writeFile(`screenshots/${fileName}.html`, pageSource)
}

exports.getPNG = async (page: Page, fileName: string) => {
    await page.screenshot({ path: `screenshots/${fileName}.png`, fullPage: true })
}

exports.screenshot = async (page: Page, fileName: string) => {
    await exports.saveHTML(page, fileName)
    await exports.getPNG(page, fileName)
}

module.exports = function appUtils() {
    return { ...exports }
}