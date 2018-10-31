/*eslint no-console: ["error", { allow: ["log", "error"] }] */
require('dotenv').config()
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

process.env.VUE_ENV = 'client'
const DIST =process.env.DIST_FOLDER

let config = merge(require('../webpack/webpack.config'), {
    entry: {
        app: './app/entry-client.js',
        style: './app/assets/sass/app.scss',
    },
    resolve: {
        alias: {
            'create-api': './create-api-client.js'
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin([ 'NODE_ENV', 'VUE_ENV', 'APP_DOMAIN' ]),
        new webpack.DefinePlugin({
            isBrowser: true
        }),
        new VueSSRClientPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    minChunks: 2
                },
                manifest: {
                    name: 'manifest'
                }
            }
        }
    }
})

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new SWPrecachePlugin({
            cacheId: 'the-devs',
            filename: 'service-worker.js',
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
            staticFileGlobs: [`${DIST}/**/*.{js,html,css,svg,png,jpg}`],
            minify: true,
            runtimeCaching: [
                {
                    urlPattern: '/',
                    handler: 'networkFirst'
                }
            ]
        })
    )
} else {
    config = merge(config, {
        devServer: {
            setup: function (app) {
                app.get('/service-worker.js', function (req, res) {
                    res.set({ 'Content-Type': 'application/javascript; charset=utf-8' })
                    res.send(fs.readFileSync(`/${DIST}/service-worker.js`))
                })
            }
        }
    })
}

module.exports = config
