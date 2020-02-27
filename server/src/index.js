const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const routes = require('./routes')
const webSocket = require('./socket')
const session = require('express-session')
const shortid = require('shortid')
const admin = require('firebase-admin')
const serviceAccount = require('../firebase.key.json')

const port = 8081
const app = express()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://queue-1337.firebaseio.com',
})

const db = admin.firestore()

app.use(bodyParser.json())
app.use(
    session({
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
    }),
)

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

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use('/', routes(db))

const server = http.createServer(app)
const ws = webSocket(server, db)

server.listen(process.env.PORT || port, () =>
    console.log(`Listing on port ${port}`),
)
