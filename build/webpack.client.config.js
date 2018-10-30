/*eslint no-console: ["error", { allow: ["log", "error"] }] */
require('dotenv').config()
const webpack = require('webpack')
const merge = require('webpack-merge')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

process.env.VUE_ENV = 'client'

const config = merge(require('../webpack/webpack.config'), {
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
            minify: true,
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
            runtimeCaching: [
                {
                    urlPattern: '/',
                    handler: 'networkFirst'
                },
                {
                    urlPattern: /\/(top|new|show|ask|jobs)/,
                    handler: 'networkFirst'
                },
                {
                    urlPattern: '/item/:id',
                    handler: 'networkFirst'
                },
                {
                    urlPattern: '/user/:id',
                    handler: 'networkFirst'
                }
            ]
        })
    )
}

module.exports = config
