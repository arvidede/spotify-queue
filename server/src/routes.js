const controllers = require('./controllers')
const routes = require('express').Router()

module.exports = middleware => {
    routes.get('/authorize', controllers.authorize)

    routes.get('/token', controllers.requestToken)

    routes.get('/refresh', controllers.refreshToken)

    routes.get('/host', middleware.withDB, controllers.host)

    routes.get('/validate', controllers.validate)

    routes.get('/search', middleware.withAppToken, controllers.search)

    routes.get('/get-queue', middleware.withDB, controllers.getQueue)

    routes.put(
        '/add-to-queue',
        middleware.withDB,
        middleware.withAppToken,
        middleware.withWebSocket,
        controllers.addTrackToQueue,
    )

    routes.delete(
        '/remove-from-queue',
        middleware.withDB,
        middleware.withWebSocket,
        controllers.removeTrackFromQueue,
    )

    return routes
}
