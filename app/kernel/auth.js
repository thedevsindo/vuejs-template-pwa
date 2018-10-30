import { satellite } from 'utils'

const authWatcher = store => {
    store.subscribe((mutation, state) => {
        const { auth: { oauth } } = state
        if (mutation.type === 'auth/authenticated') {
            if (isBrowser) {
                document.cookie = `TokenType=${oauth.token_type}`
                document.cookie = `Token=${oauth.access_token}`
            }
            satellite.defaults.headers.Authorization = `${oauth.token_type} ${oauth.access_token}`
        }
        if (mutation.type === 'auth/purge') {
            delete satellite.defaults.headers.Authorization
        }
    })
}

export {
    authWatcher
}
