import queryRoute from 'utils/queryRoute'

global['dd'] = function (...logs) {
    const util = require('util')

    /*eslint no-console: ["error", { allow: ["log"] }] */
    for (let i = 0; i < logs.length; i++) {
        if (typeof logs[i] === 'object') {
            logs[i] = util.inspect(logs[i], false, null)
        }
    }
    /*eslint no-console: ["error", { allow: ["log"] }] */
    console.log('LOG ->', ...logs)
}

global['queryRoute'] = queryRoute
