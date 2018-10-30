/*eslint no-console: ["error", { allow: ["error"] }] */
import moment from 'moment'

class VMoment {
    constructor(obj) {
        if (obj.locale) {
            moment.locale(obj.locale)
        }
        return moment
    }
}

VMoment.install = function (Vue, options) {
    const obj = options || {}
    if(typeof obj != 'object') {
        console.error('[VMoment] the options should be an object type.')
        return false
    }

    if (!Vue.$vmoment) {
        Vue.$vmoment = new VMoment(obj)
    }

    if (!Vue.prototype.$vmoment) {
        Object.defineProperty(Vue.prototype, '$vmoment', {
            get () {
                return Vue.$vmoment
            }
        })
    }
}

export default VMoment
