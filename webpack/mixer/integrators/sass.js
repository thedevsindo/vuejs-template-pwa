'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

class sass {
    constructor (mixer) {
        this._mixer = mixer
        this._config = {
            extractSass: {
                filename: 'app.css'
            }
        }
        this._rules = {
            test: /\.s?[ac]ss$/
        }
        this._plugins = []
    }

    integrate () {
        const { _mixer } = this

        if (_mixer._integration.sass && _mixer._integration.sass.config) {
            _mixer.merge('_config', _mixer._integration.sass.config, this)
        }

        const extractSass = new MiniCssExtractPlugin(this._config.extractSass)
        _mixer.merge('_plugins', extractSass, this)

        _mixer.merge('_rules', {
            use: [
                this._mixer._mode !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
        }, this)

        return [
            { key: '_module.rules', value: [this._rules] },
            { key: '_plugins', value: this._plugins },
        ]
    }
}

module.exports = sass
