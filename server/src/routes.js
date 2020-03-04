const FieldValue = require('firebase-admin').firestore.FieldValue
const routes = require('express').Router()

const Response = res => {
    return JSON.stringify({ data: res })
}

routes_ = db => {
    routes.get('/join', (req, res) => {
        res.status(200).send(Response(true))
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
        res.status(200).send(Response(req.session.id))
    })

    routes.get('/validate', (req, res) => {
        db.collection('sessions')
            .doc(req.query.id)
            .get()
            .then(doc => {
                res.status(200).send(Response(doc.exists))
            })
    })

    routes.get('/search', (req, res) => {
        // Search spotify here
        console.log(req.query)
        setTimeout(() => {
            res.status(200).send(
                Response({
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
