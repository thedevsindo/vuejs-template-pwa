import { createAPI } from 'create-api'
import dropship from 'api/dropship'
import cookieParser from 'cookie'

const satellite = createAPI()

function fetch (path) {
    return new Promise((resolve, reject) => {
        satellite.get(path).then((response) => {
            const data = response.data
            resolve(data)
        }).catch(reject)
    })
}

export function Authorization () {
    const Authorization = { authenticated: false, value: null }
    if (satellite.onServer) {
        const { cookie } = dropship
        if (cookie.Token) {
            Authorization.authenticated = true
            Authorization.value = `${cookie.TokenType} ${cookie.Token}`
            Authorization.TokenType = cookie.TokenType
            Authorization.Token = cookie.Token
            satellite.defaults.headers.Authorization = Authorization.value
        }
    } else {
        const { cookie } = document
        const { TokenType, Token } = cookieParser.parse(cookie)
        if (Token) {
            Authorization.authenticated = true
            Authorization.value = `${TokenType} ${Token}`
            Authorization.TokenType = TokenType
            Authorization.Token = Token
            satellite.defaults.headers.Authorization = Authorization.value
        }
    }
    return Authorization
}

export function fetchAccount (id) {
    return fetch(`user/id/${id}`)
}

export function fetchMatchToday ({ sportID }) {
    return fetch(`match/sport.id/${sportID}/take/all/with.total/false/for/today`)
}

export function fetchMatchBetween ({ sportID, start, from }) {
    return fetch(`match/sport.id/${sportID}/take/all/with.total/false/startdate.between/${start},${from}`)
}

export function fetchMatchLive ({ sportID }) {
    return fetch(`match/sport.id/${sportID}/take/all/with.total/false/for/live`)
}

export function fetchMatch (id) {
    return fetch(`match/id/${id}/set/first`)
}

export function fetchMatchIncident (id) {
    return fetch(`incident/match.id/${id}/take/all`)
}

export function fetchMatchCommentary (id) {
    return fetch(`commentary/match.id/${id}/take/all`)
}

export function fetchMatchLivestats (id) {
    return fetch(`livestats/match.id/${id}/take/all`)
}

export function fetchMatchLineup (id) {
    return fetch(`lineup/participant.id/${id}/take/all`)
}
