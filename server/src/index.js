const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const routes = require('./routes')
const webSocket = require('./socket')
const session = require('express-session')
const shortid = require('shortid')

const port = 8081
const app = express()

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
app.use('/', routes)

const server = http.createServer(app)

const ws = webSocket(server)

server.listen(process.env.PORT || port, () =>
    console.log(`Listing on port ${port}`),
)
