import { SEARCH_URL } from './constants'
const FieldValue = require('firebase-admin').firestore.FieldValue
const routes = require('express').Router()
const axios = require('axios')

const Response = res => {
    return JSON.stringify({ data: res })
}

const routes_ = (db, token) => {
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

    routes.get('/search', async (req, res) => {
        let query = req.query

        query = query.query.replace(' ', '%')

        try {
            const searchResults = await axios({
                medthod: 'GET',
                url: `${SEARCH_URL}?q=${query}&type=track`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            res.status(200).send(Response(searchResults.data.tracks))
        } catch (error) {
            console.log(error.response)
        }
    })
    return routes
}

module.exports = routes_
