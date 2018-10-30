import validation from './validation'
import { debounce, timeout } from './helpers'
import commons from './commons'
import satellite from './satellite'
import satellitePublic from './satellitePublic'
import wAlert from './alert'

function getQuery (state) {
    let query = '/'
    const keys = Object.keys(state.query)
    for (let i = 0; i < keys.length; i++) {
        const value = state.query[keys[i]]
        if (Array.isArray(value)) {
            query += `${keys[i]}/${value.join(',')}/`
        } else if (typeof value === 'string') {
            query += `${keys[i]}/${value}/`
        }
    }
    if (state.limit > 0) {
        query += `limit/${state.limit}/position/${state.position}`
    }
    return query
}

export {
    validation,
    // Helpers stuff
    debounce,
    timeout,
    satellite,
    satellitePublic,
    commons,
    wAlert,
    getQuery
}
