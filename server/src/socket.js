const WebSocket = require('ws')

function setup(server) {
    const wss = new WebSocket.Server({ server })

    wss.on('connection', ws => {
        ws.on('message', message => {
            ws.send(`Hello, you sent -> ${message}`)
        })

        ws.send('Hi there, I am a WebSocket server')
    })
}

module.exports = setup
