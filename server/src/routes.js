const controllers = require('./controllers')
const routes = require('express').Router()

module.exports = middleware => {
    routes.get('/authorize', controllers.authorize)

    routes.get('/token', controllers.requestToken)

    routes.get('/refresh', controllers.refreshToken)

    routes.get('/join', controllers.join)

    routes.get('/host', middleware.withDB, controllers.host)

    routes.get('/validate', middleware.withDB, controllers.validate)

    routes.get('/search', middleware.withAppToken, controllers.search)
    return routes
}
