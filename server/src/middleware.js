exports.withDB = getDB => (req, _, next) => {
    req.db = getDB()
    next()
}

// Check if current token is valid and refresh if not
exports.withAppToken = (getTokenExpiration, getToken, fetchNewToken) => (
    req,
    _,
    next,
) => {
    // May need to offset somewhat to compensate for latency
    if (Date.now() < getTokenExpiration()) {
        req.token = getToken()
        next()
    } else {
        console.log('Token expired. Fetching new token!')
        fetchNewToken().then(token => {
            console.log('New token:', token)
            req.token = token
            next()
        })
    }
}

exports.withWebSocket = getWS => (req, _, next) => {
    req.ws = getWS()
    next()
}
