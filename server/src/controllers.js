import { SEARCH_URL, CLIENT_TOKEN, USER_AUTH_URL } from './constants'
import { Response } from './helpers'
const axios = require('axios')
const FieldValue = require('firebase-admin').firestore.FieldValue

//
exports.authorize = (req, res) => {
    const scopes = 'user-read-private user-read-email'
    res.status(200).send(
        Response(
            USER_AUTH_URL +
                '?response_type=code' +
                '&client_id=' +
                CLIENT_TOKEN +
                '&scope=' +
                encodeURIComponent(scopes) +
                '&redirect_uri=' +
                encodeURIComponent(
                    `${'http://localhost:3000' /*req.url*/}/host`, //${req.session.id}`,
                ),
        ),
    )
}

//
exports.join = (req, res) => {
    res.status(200).send(Response(true))
}

//
exports.host = (req, res) => {
    req.db
        .collection('sessions')
        .doc(req.session.id)
        .get()
        .then(doc => {
            if (!doc.exists) {
                req.db
                    .collection('sessions')
                    .doc(req.session.id)
                    .set({
                        spectators: 0,
                        sessionID: req.session.id,
                    })
            }
        })
    console.log('New host:', req.session.id)
    res.status(200).send(Response(req.session.id))
}

//
exports.validate = (req, res) => {
    req.db
        .collection('sessions')
        .doc(req.query.id)
        .get()
        .then(doc => {
            res.status(200).send(Response(doc.exists))
        })
}

exports.search = async (req, res) => {
    let query = req.query

    query = query.query.replace(' ', '%')

    try {
        const searchResults = await axios({
            medthod: 'GET',
            url: `${SEARCH_URL}?q=${query}&type=track`,
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
        })

        res.status(200).send(Response(searchResults.data.tracks))
    } catch (error) {
        console.log('Error fetching search:', error)
    }
}
