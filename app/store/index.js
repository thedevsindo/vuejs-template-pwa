// Modules
import { auth } from 'store/modules/auth'

// Plugins
import { authWatcher } from 'kernel/auth'
const plugins = [ authWatcher ]

export function initialState () {
    return {
        modules: {
            auth: auth()
        },
        plugins
    }
}
