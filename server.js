/*eslint no-console: ["error", { allow: ["log", "error"] }] */
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const compression = require('compression')
const microcache = require('route-cache')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const DIST =process.env.DIST_FOLDER

const app = express()
function createRenderer (bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        cache: LRU({ max: 1000, maxAge: 1000 * 60 * 15 }),
        basedir: resolve(`./${DIST}`),
        runInNewContext: false
    }))
}

let renderer
let readyPromise
const templatePath = resolve('./app/index.template.html')
if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require(`./${DIST}/vue-ssr-server-bundle.json`)
    const clientManifest = require(`./${DIST}/vue-ssr-client-manifest.json`)
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    })
} else {
    readyPromise = require('./build/setup-dev-server')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options)
        }
    )
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(cookieParser())
app.use(compression({ threshold: 0 }))
app.use(favicon('./public/logo-48.png'))
app.use(`/${DIST}`, serve(`./${DIST}`, true))
app.use('/public', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve(`./${DIST}/service-worker.js`))

app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

function render (req, res) {
    const s = Date.now()

    res.setHeader('Content-Type', 'text/html')
    res.setHeader('X-Powered-By', 'NodeJs')

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if(err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    const context = { title: 'The Devs - VUE PWA', url: req.url, cookies: req.cookies, serviceWorkerUrl: isProd ? `/${DIST}/service-worker.js` : '/service-worker.js'  }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.send(html)
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
