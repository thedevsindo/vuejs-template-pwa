/*eslint no-console: ["error", { allow: ["log", "error"] }] */
import { createApp } from 'app'
import dropship from 'api/dropship'
require('app/bootstrap/server')

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()
        const { app, router, store } = createApp()

        const { url, cookies } = context
        const { fullPath } = router.resolve(url).route
        dropship.setCookie(cookies)

        if (fullPath !== url) {
            return reject({ url: fullPath })
        }

        router.push(url)
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
                store,
                route: router.currentRoute,
                app: router.app
            }))).then(() => {
                isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
                const contextState = Object.assign({}, store.state)
                context.state = contextState
                delete context.state.auth
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}
