'use strict'

class eslint {
    constructor (mixer) {
        this._mixer = mixer
        this._rules = {
            enforce: 'pre', test: /\.(js|vue)$/, loader: 'eslint-loader', exclude: [/node_modules/, /vendor/, /packages/]
        }
    }

    integrate () {
        return [
            { key: '_module.rules', value: [this._rules] }
        ]
    }
}

module.exports = eslint
