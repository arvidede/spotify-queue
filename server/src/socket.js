const WebSocket = require('ws')
const FieldValue = require('firebase-admin').firestore.FieldValue

function setup(server, db) {
    const wss = new WebSocket.Server({ server })

    wss.on('connection', (ws, req) => {
        console.log('Socket connection', req)
        ws.on('message', m => {
            const message = JSON.parse(m)

            switch (message.type) {
                case 'join':
                    db.collection('sessions')
                        .doc(message.payload)
                        .update({ spectators: FieldValue.increment(1) })
                    break
                default:
                    break
            }
        })
    })

    wss.on('close', ws => {
        console.log('Socket connection lost')
    })
}

module.exports = setup
