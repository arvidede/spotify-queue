import {
    SEARCH_URL,
    CLIENT_TOKEN,
    USER_AUTH_URL,
    REDIRECT_URL,
} from './constants'
import { Response, fetchToken } from './helpers'
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
                    REDIRECT_URL, //${req.session.id}`,
                ),
        ),
    )
}

//
exports.requestToken = async (req, res) => {
    const token = await fetchToken({
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: REDIRECT_URL,
    })

    res.status(200).send(Response(token))
}

//
exports.refreshToken = async (req, res) => {
    const token = await fetchToken({
        grant_type: 'refresh_token',
        refreshToken: req.query.token,
    })

    res.status(200).send(Response(token))
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
