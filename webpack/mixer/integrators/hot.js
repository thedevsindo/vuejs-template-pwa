'use strict'

class hot {
    constructor (mixer) {
        this._mixer = mixer
        this._devServer = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        }
    }

    integrate () {
        const { _devServer } = this
        return [
            { key: '_devServer', value: _devServer }
        ]
    }
}

module.exports = hot
