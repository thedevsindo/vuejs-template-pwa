'use strict'

class jsx {
    constructor (mixer) {
        this._mixer = mixer
        this._rules = [
            {
                test: /\.jsx?$/, exclude: [ /node_modules/ ], loader: [ 'babel-loader' ]
            }
        ]
    }

    integrate () {
        return [
            { key: '_module.rules', value: this._rules }
        ]
    }
}

module.exports = jsx
