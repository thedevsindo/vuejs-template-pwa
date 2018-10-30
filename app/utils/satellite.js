import axios from 'axios'

const instance = axios.create({
    baseURL: `http://satellite.${process.env.APP_DOMAIN}`,
    timeout: 100000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json'
    }
})

instance.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

export default instance
