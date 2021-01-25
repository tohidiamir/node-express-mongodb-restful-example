import jwt from 'express-jwt'
import config from '../config'

export function respond(res, status, obj = {}) {
    res.format({
        'application/json': () => {
            if (status) return res.status(status).json(obj)
            res.json(obj)
        },
    })
}

export const getTokenFromHeaders = req => {
    const {
        headers: { authorization },
    } = req
    let token = authorization

    if (authorization && authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]

    console.log(token)
    return token
}

export const authRequired = jwt({
    secret: config.SECRET_TOKEN,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['RS256'],
})

export const useIdentifyUser = jwt({
    secret: config.SECRET_TOKEN,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['RS256'],
})

export const useAuthErrorHandling = (err, req, res, next) => {
    if (err && err.hasOwnProperty('name') && err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: { message: 'Invalid authorization token' } })
    }
    next()
}
