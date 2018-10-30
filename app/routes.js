import App from 'views/App'
import Home from 'views/Home'

// Auth Pages
import NotFound from 'views/extras/NotFound'

export default [
    {
        path: '/',
        component: App,
        children: [
            { path: '/', component: Home }
        ],
        meta: {
            needAuthenticated: false
        }
    },
    { path: '**', component: NotFound }
]
