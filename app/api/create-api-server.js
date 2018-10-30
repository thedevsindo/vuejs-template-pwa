import { satellite } from 'utils'
import LRU from 'lru-cache'


export function createAPI () {
    let api
    if (process.__API__) {
        api = process.__API__
    } else {
        api = process.__API__ = satellite
        api.onServer = true
        api.cachedItems = LRU({ max: 1000, maxAge: 1000 * 60 * 15 })
        api.cachedIds = {}
    }
    return api
}
