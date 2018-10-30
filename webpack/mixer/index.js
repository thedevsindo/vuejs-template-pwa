'use stric'

const _ = require('lodash')

const vueIntegrator = require('./integrators/vue')
const sassIntegrator = require('./integrators/sass')
const hotIntegrator = require('./integrators/hot')
const htmlWebpackPluginIntegrator = require('./integrators/htmlWebpackPlugin')
const fontIntegrator = require('./integrators/font')
const imageIntegrator = require('./integrators/image')
const jsxIntegrator = require('./integrators/jsx')
const eslintIntegrator = require('./integrators/eslint')

class mixer {
    constructor (baseDir = null) {
        this._mode = 'development'
        this._baseDir = baseDir || '/'
        this._baseDirMode = baseDir ? true : false
        this._plugins = []
        this._module = {
            rules: [{
                test: /\.mp3$/,
                loader: 'url-loader'
            }]
        }
        this._resolve = {
            alias: {},
            extensions: []
        }
        this._entry = []
        this._output = {
            path: this._baseDir,
            filename: 'app.js',
            publicPath: '/'
        }
        this._devServer = {}

        this._integration = {
            jsx: { active: true },
            hot: { active: true },
            sass: { active: true },
            font: { active: true },
            image: { active: true },
            eslint: { active: false }
        }

        this._configKeys = [
            '_mode', '_plugins', '_module', '_resolve', '_entry', '_output', '_devServer'
        ]

        this.mixs = {}
    }

    mode (mode) {
        this._mode = mode
        return this
    }

    js (file) {
        if (Array.isArray(file)) {

            for (let i = 0; i < file.length; i++) {
                if (this._baseDirMode) {
                    file[i] = `${this._baseDir}${file[i].replace(/^\//g, '')}`
                }
            }

            return this.merge('_entry', file)
        }

        if (this._baseDirMode) {
            file = `${this._baseDir}${file.replace(/^\//g, '')}`
        }
        this._entry.push(file)

        return this
    }

    output (output) {
        this._output = Object.assign(this._output, output)

        return this
    }

    rulesOfModule (rules) {
        if (typeof rules === 'object') {
            if (Array.isArray(rules)) {
                return this.merge('_module.rules', rules)
            }
            this._module.rules.push(rules)
        }
        return this
    }

    aliasResolver (aliases) {
        return this.merge('_resolve.alias', aliases)
    }

    extensionResolver (extensions) {
        return this.merge('_resolve.extensions', extensions)
    }

    devServer (devServer) {
        return this.merge('_devServer', devServer)
    }

    plugins (plugin) {
        return this.merge('_plugins', plugin)
    }

    merge (mergeFor = '', replacer, instance = null) {

        const that = instance ? instance : this

        if (Array.isArray(_.get(that, mergeFor))) {
            return this.mergeArray(mergeFor, replacer, that)
        }

        _.set(that, mergeFor, _.merge(_.get(that, mergeFor), replacer))
        return that
    }

    mergeArray (mergeFor = '', replacers, instance) {
        const old = _.get(instance, mergeFor)
        if (old) {
            _.set(instance, mergeFor, old.concat(replacers))
        }

        return instance
    }

    // Integrations Method

    WithIntegration () {
        if (typeof this._integration.jsx !== 'undefined' && this._integration.jsx.active) {
            const jsx = new jsxIntegrator(this).integrate()
            this.integrate(jsx)
        }

        if (typeof this._integration.vue !== 'undefined' && this._integration.vue.active) {
            const vue = new vueIntegrator(this).integrate()
            this.integrate(vue)
        }

        if (typeof this._integration.sass !== 'undefined' && this._integration.sass.active) {
            const sass = new sassIntegrator(this).integrate()
            this.integrate(sass)
        }

        if (typeof this._integration.hot !== 'undefined' && this._integration.hot.active) {
            const hot = new hotIntegrator(this).integrate()
            this.integrate(hot)
        }

        if (typeof this._integration.htmlWebpackPlugin !== 'undefined' && this._integration.htmlWebpackPlugin.active) {
            const htmlWebpackPlugin = new htmlWebpackPluginIntegrator(this).integrate()
            this.integrate(htmlWebpackPlugin)
        }

        if (typeof this._integration.font !== 'undefined' && this._integration.font.active) {
            const font = new fontIntegrator(this).integrate()
            this.integrate(font)
        }

        if (typeof this._integration.image !== 'undefined' && this._integration.image.active) {
            const image = new imageIntegrator(this).integrate()
            this.integrate(image)
        }

        if (typeof this._integration.eslint !== 'undefined' && this._integration.eslint.active) {
            const eslint = new eslintIntegrator(this).integrate()
            this.integrate(eslint)
        }
    }

    integrate (configs) {
        for (let i = 0; i < configs.length; i++) {
            const config = configs[i]
            if (config.key && config.value) {
                this.merge(config.key, config.value)
            }
        }
    }

    // integration settigs
    vue (boolean = true, config = {}) {
        return this.merge('_integration', { vue: { active: boolean, config } })
    }

    hot (boolean = true, config = {}) {
        return this.merge('_integration', { hot: { active: boolean, config } })
    }

    sass (boolean = true, config = {}) {
        return this.merge('_integration', { sass: { active: boolean, config } })
    }

    htmlWebpackPlugin (boolean = true, config = {}) {
        return this.merge('_integration', { htmlWebpackPlugin: { active: boolean, config } })
    }

    font (boolean = true, config = {}) {
        return this.merge('_integration', { font: { active: boolean, config } })
    }

    eslint (boolean = true, config = {}) {
        return this.merge('_integration', { eslint: { active: boolean, config } })
    }

    mix () {
        this.WithIntegration()
        this.addConfig()
        return this.mixs
    }

    addConfig () {
        if (this._mode !== 'production' && typeof this._integration.hot !== 'undefined' && this._integration.hot.active) {
            const PORT =process.env.PORT || 80
            if (PORT !== this._devServer.port) {
                this._output.publicPath = `http://localhost:${this._devServer.port || 9001}/`
            }
        }
        for (let i = 0; i < this._configKeys.length; i++) {
            const configKey = this._configKeys[i]
            this.mixs[configKey.replace(/^_/g, '')] = this[configKey]
        }
    }

    get baseDir () {
        return this._baseDir
    }
}

module.exports = mixer
