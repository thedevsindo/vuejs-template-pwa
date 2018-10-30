export default function queryRoute (currentRoute)  {
    const { params, query } = currentRoute
    let paramsRoute = ''
    for (let param in params) {
        paramsRoute = `/${params[param].replace(/\/$/g, '')}`
    }
    paramsRoute = paramsRoute.replace(/^\//g, '')

    const ArrQuery = {}
    if (paramsRoute) {
        const arrParams = paramsRoute.split('/')
        for (let i = 0; i < arrParams.length; i++) {
            if( i%2 == 0 ) {
                ArrQuery[arrParams[i]] = null
            }
            if( i%2 == 1 ) {
                ArrQuery[arrParams[i - 1]] = arrParams[i]
            }
        }
    }
    return Object.assign(ArrQuery, query)
}
