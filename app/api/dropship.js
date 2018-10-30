class Dropship {
    constructor () {
        this._cookie = null
    }

    get cookie () {
        return this._cookie
    }

    set cookie (cookie) {
        this._cookie = cookie
    }

    setCookie (cookies) {
        this._cookie = cookies
    }
}

export default new Dropship
