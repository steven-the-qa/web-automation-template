require('dotenv').config()
import { ViewportSize } from './types'

const iPhone12: ViewportSize = { width: 844, height: 390 }
const macBookAir: ViewportSize = { width: 1440, height: 900 }

function determineViewportSize(): ViewportSize {
    if (!process.env.VIEWPORT_SIZE) return iPhone12

    let resolution: ViewportSize;

    switch (process.env.VIEWPORT_SIZE) {
        case 'min':
            resolution = iPhone12
            break;
        case 'max':
            resolution = macBookAir
            break;
        default:
            resolution = macBookAir
    }

    return resolution
}

export const viewportSize: ViewportSize = determineViewportSize()