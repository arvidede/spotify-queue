const routes = require('./routes')
const Socket = require('./socket')
const serviceAccount = require('../firebase.key.json')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const shortid = require('shortid')
const admin = require('firebase-admin')
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)

const redisClient = redis.createClient()
const PORT = process.env.PORT || 8081

class Server {
    constructor() {
        this.createApp()
        this.configFirebase()
        this.createDb()
        this.createSession()
        this.config()
        this.createServer()
        this.createSockets()
        this.listen()
    }

    createApp() {
        this.app = express()
    }

    configFirebase() {
        this.admin = admin
        this.admin.initializeApp({
            credential: this.admin.credential.cert(serviceAccount),
            databaseURL: 'https://queue-1337.firebaseio.com',
        })
    }

    createDb() {
        this.db = this.admin.firestore()
    }

    createSession() {
        this.session = session({
            secret: 'queue',
            genid: function(req) {
                return shortid.generate()
            },
            cookie: {
                maxAge: 1000 * 60 * 60 * 6, // MS : SS : MM : HH
                secure: false,
                domain: 'localhost',
            },
            resave: true,
            saveUninitialized: true,
            rolling: true,
            store: new RedisStore({ client: redisClient }),
        })
    }

    config() {
        this.port = PORT
        this.app.use(bodyParser.json())
        this.app.use(this.session)

        const corsOptions = {
            origin: 'http://localhost:3000',
            methods: 'GET,POST',
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Accept',
                'Authorization',
                'Content-Type',
                'Cache-Control',
                'Cache',
            ],
            credentials: true,
        }

        this.app.options('*', cors(corsOptions))
        this.app.use(cors(corsOptions))
        this.app.use('/', routes(this.db))
    }

    createServer() {
        this.server = http.createServer(this.app)
    }

    createSockets() {
        this.ws = new Socket(this.server, this.db, (info, done) => {
            this.session(info.req, {}, () => {
                done(info.req.sessionID)
            })
        })
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Listing on port ${this.port}`)
        })
    }
}

module.exports = Server