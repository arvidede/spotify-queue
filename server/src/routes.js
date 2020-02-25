const routes = require('express').Router()

routes.get('/', (req, res) => {
    res.status(200).send(req.session.cookie)
})

routes.get('/enter', (req, res) => {
    res.status(200).send('Enter')
})

routes.get('/host', (req, res) => {
    res.status(200).send(req.session.id)
})

module.exports = routes
