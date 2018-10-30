const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const mixer = require('./mixer')
const baseDir = require('path').join(__dirname, '../')
const DIST =process.env.DIST_FOLDER
const PORT =process.env.PORT || 80

const Mixer = new mixer(baseDir)
Mixer
    .mode(process.env.NODE_ENV)
    .devServer({ contentBase: '/public', port: PORT })
    .output({
        path: `${Mixer.baseDir}/${DIST}`,
        publicPath: `/${DIST}/`,
        filename: '[name].[chunkhash].js'
    })
    .vue(true)
    .eslint(true)
    .extensionResolver(['.vue', '.js', '.json', '.css', '.scss'])
    .aliasResolver({
        public: `${baseDir}/public`,
        app: `${baseDir}/app`,
        views: `${baseDir}/app/views`,
        assets: `${baseDir}/app/assets`,
        images: `${baseDir}/app/assets/images`,
        components: `${baseDir}/app/components`,
        utils: `${baseDir}/app/utils`,
        kernel: `${baseDir}/app/kernel`,
        store: `${baseDir}/app/store`,
        plugins: `${baseDir}/app/plugins`,
        api: `${baseDir}/app/api`,
        satellite: `${baseDir}/app/api/index`,
        pace: 'pace-js',
    })
    .sass(true, { extractSass: { filename: '[name].[chunkhash].css' } })
    .plugins([
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ])

const MixerConfig = Mixer.mix()

MixerConfig.devtool = process.env.NODE_ENV === 'production' ? false : '#cheap-module-source-map'
MixerConfig.module.noParse = /es6-promise\.js$/
MixerConfig.performance = {
    maxEntrypointSize: 300000,
    hints: false
}

let plugins = []
if (process.env.NODE_ENV === 'production') {
    plugins = [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
            filename: 'common.[chunkhash].css'
        })
    ]
} else {
    plugins = [
        new FriendlyErrorsPlugin()
    ]
}

module.exports = merge(MixerConfig, {
    plugins
})
