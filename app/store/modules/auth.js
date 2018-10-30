import {
    fetchAccount,
    Authorization
} from 'api'

function initialState (type = 'all') {
    if (type === 'oauth') {
        return {
            token_type: null,
            access_token: null
        }
    }
    if (type === 'user') {
        return {}
    }
    return {
        authenticated: false,
        oauth: {
            token_type: null,
            access_token: null
        },
        user: {
            id: null
        }
    }
}

export function auth () {
    return {
        namespaced: true,
        state: initialState(),
        mutations: {
            authenticated (state) {
                state.authenticated = true
            },
            saveToken (state, oauth) {
                state.authenticated = true
                state.oauth = oauth
            },
            saveUser (state, data) {
                state.authenticated = true
                state.user = data
            },
            init (state) {
                state = initialState()
                state.authenticated = false
            },
            purge (state) {
                state.authenticated = false
                state.oauth = initialState('oauth')
                state.user = initialState('user')
            }
        },
        actions: {
            init ({ commit }) {
                commit('init')
            },
            authorization ({ getters, dispatch }) {
                const Auth = Authorization()
                if (isBrowser) {
                    if (Auth.authenticated) {
                        const { user } = getters
                        if (user.id !== null) {
                            return Promise.resolve()
                        } else {
                            return dispatch('Authenticated', { Auth })
                        }
                    }
                    return Promise.reject()
                }
                if (Auth.authenticated) {
                    return dispatch('Authenticated', { Auth })
                }
                return Promise.reject()
            },
            Authenticated ({ dispatch }, { Auth }) {
                return new Promise((resolve, reject) => {
                    fetchAccount('my').then(user => {
                        dispatch('saveToken', { oauth: { token_type: Auth.TokenType, access_token: Auth.Token }, callback: () => {
                            dispatch('saveUser', { user: user.data.records, callback: () => {
                                dispatch('authenticated', () => {
                                    resolve()
                                })
                            } })
                        } })
                    }).catch(error => reject(error))
                })
            },
            saveToken ({ commit }, { oauth, callback }) {
                commit('saveToken', oauth)
                if (typeof callback === 'function') {
                    callback()
                }
            },
            authenticated ({ commit }, callback) {
                commit('authenticated')
                if (typeof callback === 'function') {
                    callback()
                }
            },
            saveUser ({ commit }, { user, callback }) {
                commit('saveUser', user)
                if (typeof callback === 'function') {
                    callback()
                }
            },
            purge ({ commit }, callback) {
                commit('purge')
                if (typeof callback === 'function'){
                    callback()
                }
            },
        },
        getters: {
            accesToken: state => {
                return state.oauth.access_token
            },
            user: state => {
                return state.user
            },
            authenticated: state => {
                return state.authenticated
            }
        }
    }
}

export const authInitState = initialState
