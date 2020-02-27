import { createServer, Server } from 'http'
import * as express from 'express'
import * as socketIo from 'socket.io'

import { Message } from './model'

export class ChatServer {
    constructor() {
        this.createApp()
        this.config()
        this.createServer()
        this.sockets()
        this.listen()
    }

    createApp() {
        this.app = express()
    }

    createServer() {
        this.server = createServer(this.app)
    }

    config() {
        this.port = process.env.PORT || ChatServer.PORT
    }

    sockets() {
        this.io = socketIo(this.server)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port)
        })

        this.io.on('connect', socket => {
            console.log('Connected client on port %s.', this.port)
            socket.on('message', m => {
                console.log('[server](message): %s', JSON.stringify(m))
                this.io.emit('message', m)
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })
    }
}
