const FieldValue = require('firebase-admin').firestore.FieldValue
const routes = require('express').Router()

routes_ = db => {
    routes.get('/', (req, res) => {
        res.status(200).send(req.session.cookie)
    })

    routes.get('/join', (req, res) => {
        res.status(200).send(true)
    })

    routes.get('/host', (req, res) => {
        db.collection('sessions')
            .doc(req.session.id)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    db.collection('sessions')
                        .doc(req.session.id)
                        .set({
                            spectators: 0,
                            sessionID: req.session.id,
                        })
                }
            })
        res.status(200).send(req.session.id)
    })

    routes.post('/validate', (req, res) => {
        db.collection('sessions')
            .doc(req.body.id)
            .get()
            .then(doc => {
                res.status(200).send(doc.exists)
            })
    })
    return routes
}

module.exports = routes_
