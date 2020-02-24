const routes = require('express').Router()

routes.get('/', (req, res) => {
    res.status(200).send('Main')
})

routes.get('/enter', (req, res) => {
    res.status(200).send('Enter')
})

routes.get('/host', (req, res) => {
    res.status(200).send('Host')
})

module.exports = routes
