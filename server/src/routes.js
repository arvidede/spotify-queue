const controllers = require('./controllers')
const routes = require('express').Router()

module.exports = middleware => {
    routes.get('/authorize', controllers.authorize)

    routes.get('/join', controllers.join)

    routes.get('/host', middleware.withDB, controllers.host)

    routes.get('/validate', controllers.validate)

    routes.get('/search', middleware.withAppToken, controllers.search)
    return routes
}
