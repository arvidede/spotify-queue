import {
    TOKEN_URL,
    CLIENT_TOKEN,
    CLIENT_TOKEN_SECRET,
    DATABASE_URL,
    TOKEN_BASE_64,
    PORT,
} from './constants'
import { fetchToken, shortID } from './helpers'
const routes = require('./routes')
const Socket = require('./socket')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const shortid = require('shortid')
const admin = require('firebase-admin')
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const axios = require('axios')
const middleware = require('./middleware')
const redisClient = redis.createClient(
    process.env.NODE_ENV === 'production' ? process.env.REDIS_URL : '',
)

class Server {
    constructor() {
        this.token = ''
        this.tokenExpiration = 0
        this.createApp()
        this.configFirebase()
        this.createDb()
        this.createSession()
        this.fetchToken()
        this.config()
        this.createRoutes()
        this.createServer()
        this.createSockets()
        this.listen()
    }

    createApp() {
        this.app = express()
    }

    configFirebase() {
        this.admin = admin
        const serviceAccount = {
            type: process.env.FIREBASE_TYPE,
            project_id: process.env.FIREBASE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_CLIENT_ID,
        }

        this.admin.initializeApp({
            credential: this.admin.credential.cert(serviceAccount),
            databaseURL: DATABASE_URL,
        })
    }

    createDb() {
        this.db = this.admin.firestore()
    }

    createSession() {
        this.session = session({
            secret: 'queue',
            genid: function (req) {
                // return shortid.generate()
                return shortID()
            },
            cookie: {
                maxAge: 1000 * 60 * 60 * 6, // MS : SS : MM : HH
                secure: false,
                domain: process.env.DOMAIN,
            },
            resave: true,
            saveUninitialized: true,
            rolling: true,
            store: new RedisStore({ client: redisClient }),
        })
    }

    fetchToken = async () => {
        const token = await fetchToken({
            grant_type: 'client_credentials',
        })
        this.token = token.access_token
        this.tokenExpiration = Date.now() + token.expires_in * 1000
        return this.token
    }

    config() {
        this.port = PORT
        this.app.use(bodyParser.json())
        this.app.use(this.session)
        const origin = process.env.NODE_ENV === 'production' ? ['https://queue.rocks', 'https://accounts.spotify.com'] : ['http://localhost:3000']
        const corsOptions = {
            origin,
            methods: 'GET,POST,PUT,DELETE',
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
    }

    createRoutes = () => {
        const middlewares = {
            withAppToken: middleware.withAppToken(
                () => this.tokenExpiration,
                () => this.token,
                this.fetchToken,
            ),
            withDB: middleware.withDB(() => this.db),
            withWebSocket: middleware.withWebSocket(() => this.ws),
        }

        this.app.use('/', routes(middlewares))
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
