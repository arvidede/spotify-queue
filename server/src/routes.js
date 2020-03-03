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

    routes.get('/search', (req, res) => {
        // Search spotify here
        setTimeout(() => {
            res.status(200).send(
                JSON.stringify({
                    tracks: [...TRACKS].splice(
                        0,
                        Math.floor(TRACKS.length * Math.random()),
                    ),
                }),
            )
        }, 1500)
    })
    return routes
}

const TRACKS = [
    {
        title: 'Song title',
        artist: 'Singer',
        artwork: '../../assets/img/album.jpg',
        length: 1337,
        votes: 1,
    },
    {
        title: 'Song title',
        artist: 'Singer',
        artwork: '../../assets/img/album.jpg',
        length: 1337,
        votes: 1,
    },
    {
        title: 'Song title',
        artist: 'Singer',
        artwork: '../../assets/img/album.jpg',
        length: 1337,
        votes: 1,
    },
    {
        title: 'Song title',
        artist: 'Singer',
        artwork: '../../assets/img/album.jpg',
        length: 1337,
        votes: 1,
    },
]

module.exports = routes_
