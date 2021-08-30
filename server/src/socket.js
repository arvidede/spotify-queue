import { COLLECTIONS } from './constants'
import { Host } from './helpers'
const WebSocket = require('ws')

const Message = (type, payload) => {
    return JSON.stringify({
        type,
        payload,
    })
}
class Socket {
    constructor(server, db, verifyClient) {
        this.wss = new WebSocket.Server({
            server,
            verifyClient,
        })
        this.db = db
        this.config()
    }

    config() {
        this.wss.on('connection', (ws, req) => {
            this.store = req.sessionStore.client
            ws.clientID = req.sessionID

            ws.on('message', m => {
                const message = JSON.parse(m)

                switch (message.type) {
                    case 'join':
                        this.joinChannel(req.sessionID, message.payload)
                        break
                    case 'vote':
                        this.doVoteForTrack(req.sessionID, message.payload)
                    default:
                        break
                }
            })

            ws.on('close', () => {
                this.deleteFromChannel(req.sessionID)
                console.log('Lost connection with client:', req.sessionID)
            })
        })

        setInterval(() => {
            this.wss.clients.forEach(client => {
                client.send(Message('ping', new Date().toTimeString()))
            })
        }, 10000)
    }

    joinChannel = (sessionID, room) => {
        console.log('Client', sessionID, 'joined room', room)

        try {
            this.store.exists(Host(room), () => {
                this.store.set(sessionID, room)
                this.store.sadd(Host(room), sessionID)
                this.store.smembers(Host(room), (err, channel) => {
                    this.doSendMessage(
                        'numSubscribers',
                        channel.length,
                        channel,
                    )
                })
            })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    deleteFromChannel = id => {
        this.store.get(id, (err, res) => {
            this.store.del(id)
            this.store.srem(Host(res), id)
            this.store.smembers(Host(res), (err, channel) => {
                this.doSendMessage('numSubscribers', channel.length, channel)
            })
        })
    }

    doVoteForTrack = async (client, payload) => {
        console.log('Vote:', payload)
        const room = payload.room
        const trackRef = this.db.collection(COLLECTIONS.QUEUE).doc(room)
        trackRef.get().then(doc => {
            // workaround until Firestore arrayRemove supports filter keys
            const tracks = doc.data().tracks
            const index = tracks.findIndex(t => t.queue_id === payload.id)
            if (index !== -1) {
                tracks[index].votes =
                    tracks[index].votes + (payload.vote ? 1 : -1)
                trackRef.update({ tracks })
                this.store.smembers(Host(room), (err, channel) => {
                    const track = {
                        id: tracks[index].queue_id,
                        votes: tracks[index].votes,
                    }
                    this.doSendMessage(
                        'vote',
                        track,
                        channel.filter(id => id !== client),
                    )
                })
            }
        })
    }

    doSendAddedTrack = async (track, room, client) => {
        this.store.smembers(Host(room), (err, channel) => {
            this.doSendMessage(
                'trackAdded',
                track,
                channel.filter(id => id !== client),
            )
        })
    }

    doSendRemovedTrack = async (trackID, room, client) => {
        this.store.smembers(Host(room), (err, channel) => {
            this.doSendMessage('trackRemoved', trackID, channel)
        })
    }

    doSendMessage = (type, payload, receivers) => {
        const message = Message(type, payload)
        this.wss.clients.forEach(client => {
            if (receivers.includes(client.clientID)) {
                client.send(message)
            }
        })
    }
}

module.exports = Socket
