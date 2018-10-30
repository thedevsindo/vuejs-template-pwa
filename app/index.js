import Vue from 'vue'
import { createRouter } from 'kernel'
import { createStore } from 'kernel/store'
import { sync } from 'vuex-router-sync'
import titleMixin from 'utils/title'
import * as filters from 'utils/filters'
import VueResource from 'vue-resource'
import VMoment from 'plugins/vmoment'
import VSocket from 'plugins/vsocket'
import isOddEven from 'plugins/isOddEven'
import VueLocalez from 'vue-localez'

Vue.mixin(titleMixin)
Vue.use(VueResource)
Vue.use(isOddEven)
Vue.use(VMoment, { locale: 'id' })
Vue.use(VSocket, { baseUrl: `http://drone.${process.env.APP_DOMAIN}` })

VueLocalez.requireAll(require.context('./lang', true, /\.json$/))
Vue.use(VueLocalez, { // Options
    lang: 'id', // lang
    extension: 'json' // language resource
})

require('components')

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

export function createApp () {
    const store = createStore()
    const router = createRouter()
    sync(store, router)
    router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.needAuthenticated)) {
            if (isBrowser) {
                store.dispatch('auth/authorization').then(() => next()).catch(() => {
                    store.dispatch('auth/purge', () => next('/login'))
                })
            } else {
                store.dispatch('auth/authorization').then(() => next()).catch(() => {
                    store.dispatch('auth/purge', () => next('/login'))
                })
            }
        } else if (to.matched.some(record => record.meta.authenticationPage)) {
            if (isBrowser) {
                store.dispatch('auth/authorization').then(() => next('/')).catch(() => {
                    store.dispatch('auth/purge', () => next())
                })
            } else {
                store.dispatch('auth/authorization').then(() => next('/')).catch(() => {
                    store.dispatch('auth/purge', () => next())
                })
            }
        } else {
            next()
        }
    })
    const app = new Vue({
        router, store,
        render: h => h('router-view'),
        data: function() {
            return {
                sockets: {
                    notification: {
                        namespace: 'notification'
                    }
                }
            }
        }
    })
    return { app, router, store }
}
