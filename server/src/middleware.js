exports.withDB = getDB => (req, res, next) => {
    req.db = getDB()
    next()
}

// Check if current token is valid and refresh if not
exports.withAppToken = (getTokenExpiration, getToken) => (req, res, next) => {
    // May need to offset somewhat to compensate for latency
    if (Date.now() < getTokenExpiration()) {
        req.token = getToken()
        next()
    } else {
        console.log('Token expired. Fetching new token!')
        this.fetchToken().then(token => {
            console.log('New token:', token)
            req.token = token
            next()
        })
    }
}
