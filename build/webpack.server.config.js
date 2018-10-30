require('dotenv').config()
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

process.env.VUE_ENV = 'server'

module.exports = merge(require('../webpack/webpack.config'), {
    target: 'node',
    devtool: '#source-map',
    entry: './app/entry-server.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias: {
            'create-api': './create-api-server.js'
        }
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.EnvironmentPlugin([ 'NODE_ENV', 'VUE_ENV', 'APP_DOMAIN' ]),
        new webpack.DefinePlugin({
            isBrowser: false
        }),
        new VueSSRServerPlugin()
    ]
})
