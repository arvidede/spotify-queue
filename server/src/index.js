require('dotenv').config({ path: __dirname + '/../.env' })
const Server = require('./server')

const server = new Server()
