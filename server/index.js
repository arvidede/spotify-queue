const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const routes = require('./src/routes')
const webSocket = require('./src/socket')

const port = 8081
const app = express()

app.use(bodyParser.json())

const corsOptions = {
    origin: ['http://localhost'],
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Cache-Control']
}

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use('/', routes)

const server = http.createServer(app)

const ws = webSocket(server)

server.listen(process.env.PORT || port, () => console.log(`Listing on port ${port}`))


