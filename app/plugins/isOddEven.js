/*eslint no-console: ["error", { allow: ["error"] }] */

class isOddEven {
    isOdd (n) {
        return n % 2 == 0
    }

    isEven (n) {
        return Math.abs(n % 2) == 1
    }

    constructor () {
        return this
    }
}

isOddEven.install = function (Vue, options) {
    const obj = options || {}
    if(typeof obj != 'object') {
        console.error('[isOddEven] the options should be an object type.')
        return false
    }

    if (!Vue.$isOddEven) {
        Vue.$isOddEven = new isOddEven()
    }

    if (!Vue.prototype.$isOddEven) {
        Object.defineProperty(Vue.prototype, '$isOddEven', {
            get () {
                return Vue.$isOddEven
            }
        })
    }
}

export default isOddEven
