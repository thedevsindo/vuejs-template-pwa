/*eslint no-console: ["error", { allow: ["error"] }] */
import io from 'socket.io-client'

class VSocket {
    constructor(obj) {
        this.configs = obj
        return this
    }

    connect(namespace) {
        const { configs } = this
        return io(`${configs.baseUrl}/${namespace}`)
    }
}

VSocket.install = function (Vue, options) {
    const obj = options || {}
    if(typeof obj != 'object') {
        console.error('[VSocket] the options should be an object type.')
        return false
    }

    if (!Vue.$io) {
        Vue.$io = new VSocket(obj)
    }

    if (!Vue.prototype.$io) {
        Object.defineProperty(Vue.prototype, '$io', {
            get () {
                return Vue.$io
            }
        })
    }
}

export default VSocket
