'use strict'

const HTMLWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

class htmlWebpackPlugin {
    constructor (mixer) {
        this._mixer = mixer
        this._config = {
            htmlWebpack: {
                template: '',
                inject: 'body',
                filename: '/public/index.html',
                alwaysWriteToDisk: false
            }
        }
        this._plugins = []
    }

    integrate () {
        const { _mixer } = this
        if (_mixer._integration.htmlWebpackPlugin && _mixer._integration.htmlWebpackPlugin.config) {
            _mixer.merge('_config', _mixer._integration.htmlWebpackPlugin.config, this)
        }

        const htmlWebpack = new HTMLWebpackPlugin(this._config.htmlWebpack)
        _mixer.merge('_plugins', htmlWebpack, this)
        if (this._config.htmlWebpack.alwaysWriteToDisk) {
            _mixer.merge('_plugins', new HtmlWebpackHarddiskPlugin(), this)
        }
        return [
            { key: '_plugins', value: this._plugins }
        ]
    }
}

module.exports = htmlWebpackPlugin
