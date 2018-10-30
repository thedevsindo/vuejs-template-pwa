'use strict'

class image {
    constructor (mixer) {
        this._mixer = mixer
        this._rules = [
            {
                test: /\.(jpg|png)$/, use: { loader: 'file-loader', options: { name: 'images/[name].[hash].[ext]' } }
            },
            {
                test: /\.svg$/, loader: 'svg-inline-loader'
            }
        ]
    }

    integrate () {
        return [
            { key: '_module.rules', value: this._rules }
        ]
    }
}

module.exports = image
