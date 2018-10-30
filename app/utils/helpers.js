export function debounce(func, wait = 250, immediate, ...arg) {
    let timeout = null
    return function () {
        const context = this
        const args = arg
        const later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

export function timeout(func, wait = 1, ...args) {
    return function() {
        const self = this
        const later = function () {
            func.apply(self, args)
        }
        setTimeout(later, wait)
    }
}
