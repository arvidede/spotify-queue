import {
    SEARCH_URL,
    CLIENT_TOKEN,
    USER_AUTH_URL,
    REDIRECT_URL,
    COLLECTIONS,
    TRACK_URL,
} from './constants'
import { Response, fetchToken, extractTrackInformation } from './helpers'
const axios = require('axios')
const FieldValue = require('firebase-admin').firestore.FieldValue

/* HTTPS CODES */
const STATUS = {
    OK: 200,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    PARTIAL_CONTENT: 206,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    INTERNAL_SERVER_ERROR: 500,
}

//
exports.authorize = (req, res) => {
    const scopes = 'user-read-private user-read-email'
    res.status(STATUS.OK).send(
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

    res.status(STATUS.OK).send(Response(token))
}

//
exports.refreshToken = async (req, res) => {
    const token = await fetchToken({
        grant_type: 'refresh_token',
        refreshToken: req.query.token,
    })

    res.status(STATUS.OK).send(Response(token))
}

//
exports.host = (req, res) => {
    req.db
        .collection(COLLECTIONS.QUEUE)
        .doc(req.session.id)
        .get()
        .then(doc => {
            if (!doc.exists) {
                req.db
                    .collection(COLLECTIONS.QUEUE)
                    .doc(req.session.id)
                    .set({
                        tracks: [],
                    })
            }
        })
    console.log('New host:', req.session.id)
    res.status(STATUS.OK).send(Response(req.session.id))
}

//
exports.validate = (req, res) => {
    req.db
        .collection(COLLECTIONS.QUEUE)
        .doc(req.query.id)
        .get()
        .then(doc => {
            res.status(STATUS.OK).send(Response(doc.exists))
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

        const tracks = searchResults.data.tracks.items.map(t =>
            extractTrackInformation(t),
        )

        res.status(STATUS.OK).send(Response(tracks))
    } catch (error) {
        console.log('Error fetching search:', error)
    }
}

exports.getQueue = async (req, res) => {
    const id = req.query.id
    console.log('Get queue:', id)
    req.db
        .collection(COLLECTIONS.QUEUE)
        .doc(id)
        .get()
        .then(doc => {
            if (doc.exists) {
                res.status(STATUS.OK).send(Response(doc.data()))
            } else {
                res.status(STATUS.NO_CONTENT).send(Response([]))
            }
        })
}

exports.addTrackToQueue = async (req, res) => {
    const { trackID, sessionID } = req.query
    try {
        const track = await axios({
            medthod: 'GET',
            url: `${TRACK_URL}/${trackID}`,
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
        }).then(res => extractTrackInformation(res.data))

        req.ws.doSendAddedTrack(track, sessionID, req.sessionID)

        req.db
            .collection(COLLECTIONS.QUEUE)
            .doc(sessionID)
            .update({
                tracks: FieldValue.arrayUnion(track),
            })
            .then(() => {
                res.status(STATUS.OK).send(Response(track.queue_id))
            })
    } catch (error) {
        console.log('Error adding track:', error)
        res.status(STATUS.INTERNAL_SERVER_ERROR).send(Response({ error }))
    }
}

exports.removeTrackFromQueue = async (req, res) => {
    const { trackID, sessionID } = req.query
    req.ws.doSendRemovedTrack(trackID, sessionID, req.sessionID)

    const trackRef = req.db.collection(COLLECTIONS.QUEUE).doc(sessionID)

    trackRef
        .get()
        .then(doc => {
            // workaround until Firestore arrayRemove supports filter keys
            const tracks = doc.data().tracks
            trackRef.update({
                tracks: tracks.filter(t => t.queue_id !== trackID),
            })
        })
        .then(() => {
            res.status(STATUS.OK).send(Response('OK'))
        })
        .catch(error => {
            console.log('Error removing track:', error)
            res.status(STATUS.INTERNAL_SERVER_ERROR).send(Response({ error }))
        })
}
