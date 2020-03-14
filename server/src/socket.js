const WebSocket = require('ws')
const FieldValue = require('firebase-admin').firestore.FieldValue

const Message = (type, payload) => {
    return JSON.stringify({
        type,
        payload,
    })
}

const Host = id => `host-${id}`
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
            ws.clientID = req.sessionID

            ws.on('message', m => {
                const message = JSON.parse(m)

                switch (message.type) {
                    case 'join':
                        console.log(
                            'Client',
                            req.sessionID,
                            'joined room',
                            message.payload,
                        )

                        try {
                            store.set(req.sessionID, message.payload)
                            store.sadd(Host(message.payload), req.sessionID)
                            store.smembers(
                                Host(message.payload),
                                (err, channel) => {
                                    this.doSendMessage(
                                        'noSubscribers',
                                        channel.length,
                                        channel,
                                    )
                                },
                            )
                        } catch (error) {
                            console.error(error)
                        }
                        break
                    case 'host':
                        this.setupChannel(store, req.sessionID)
                        break
                    default:
                        break
                }
            })

            ws.on('close', () => {
                this.deleteFromChannel(store, req.sessionID)
                console.log('Lost connection with client:', req.sessionID)
            })
        })
    }

    setupChannel = (store, id) => {
        store.sadd(Host(id), id)
    }

    deleteFromChannel = (store, id) => {
        store.get(id, (err, res) => {
            store.del(id)
            store.srem(Host(res), id)
            store.smembers(Host(res), (err, channel) => {
                this.doSendMessage('noSubscribers', channel.length, channel)
            })
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
