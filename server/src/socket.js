const WebSocket = require('ws')
const FieldValue = require('firebase-admin').firestore.FieldValue

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
            const store = req.sessionStore.client
            console.log('Socket connection', req.sessionID)

            ws.clientID = req.sessionID

            ws.on('message', m => {
                const message = JSON.parse(m)

                switch (message.type) {
                    case 'join':
                        console.log(
                            'Adding to store',
                            req.sessionID,
                            message.payload,
                        )

                        try {
                            store.set(req.sessionID, message.payload)
                            store.sadd(message.payload, req.sessionID)
                            store.smembers(message.payload, (err, channel) => {
                                this.doSendMessage(
                                    'noSubscribers',
                                    channel.length,
                                    channel,
                                )
                            })
                        } catch (error) {
                            console.error(error)
                        }
                        break
                    case 'host':
                        store.sadd(req.sessionID, req.sessionID)
                        break
                    case 'leave':
                        this.deleteFromChannel(store, req.sessionID)
                    default:
                        break
                }
            })

            ws.on('close', () => {
                this.deleteFromChannel(store, req.sessionID)
                console.log('Socket connection lost', req.sessionID)
            })
        })
    }

    deleteFromChannel = (store, id) => {
        store.type(id, (err, type) => {
            if (type === 'set') {
                store.del(id)
            } else if (type === 'string') {
                store.get(id, (err, res) => {
                    store.del(id)
                    store.srem(res, id)
                    store.smembers(res, (err, channel) => {
                        this.doSendMessage(
                            'noSubscribers',
                            channel.length,
                            channel,
                        )
                    })
                })
            }
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

// this.db
//                             .collection('sessions')
//                             .doc(res)
//                             .update({ spectators: FieldValue.increment(-1) })

// store.set(req.sessionID, message.payload)
//                         this.db
//                             .collection('sessions')
//                             .doc(message.payload)
//                             .update({ spectators: FieldValue.increment(1) })
