'use strict'

class font {
    constructor (mixer) {
        this._mixer = mixer
        this._rules = {
            test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/, use: [{ loader: 'file-loader', options: { name: 'fonts/[name].[ext]' } }]
        }
    }

    integrate () {
        return [
            { key: '_module.rules', value: [this._rules] }
        ]
    }
}

module.exports = font
