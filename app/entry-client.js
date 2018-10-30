/*eslint no-console: ["error", { allow: ["log", "error"] }] */
import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from 'app'
import ProgressBar from 'components/loadings/progress-bar'
import { authInitState } from 'store/modules/auth'
require('app/bootstrap/client')
require('babel-polyfill')

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

Vue.mixin({
    beforeRouteUpdate (to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    window.__INITIAL_STATE__.auth = authInitState()
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            if (!diffed) {
                diffed = (prevMatched[i] !== c)
                if (!diffed) {
                    diffed = to !== from
                }
            }
            return diffed
        })
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }
        bar.start()
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to }))).then(() => {
            bar.finish()
            next()
        }).catch(next)
    })

    app.$mount('#app-root')
})

if ('https:' === location.protocol && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js')
}
