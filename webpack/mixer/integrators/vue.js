'use strict'

const VueLoaderPlugin = require('vue-loader/lib/plugin')

class vue {
    constructor (mixer) {
        this._mixer = mixer
        this._rules = [
            {
                test: /\.vue$/, loader: 'vue-loader'
            }
        ]
        this._resolve = {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        }

        this._plugins = [
            new VueLoaderPlugin()
        ]
    }

    integrate () {
        const { _rules, _resolve, _mixer } = this

        const MiniCssExtractPlugin = require('mini-css-extract-plugin')
        this._rules.push({
            test: /\.css$/,
            use: [
                process.env.NODE_ENV !== 'production' ? 'vue-style-loader'
                    : MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        })
        this._plugins.push(new MiniCssExtractPlugin(
            _mixer._integration.sass.config.extractSass
        ))

        return [
            { key: '_module.rules', value: _rules },
            { key: '_resolve', value: _resolve },
            { key: '_plugins', value: this._plugins }
        ]
    }
}

module.exports = vue
