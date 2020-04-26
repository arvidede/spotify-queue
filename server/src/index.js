/* 
 TODO:
 -

 Fix:
 - Fetching a new token when the current has expired does not work
*/

require('dotenv').config({ path: __dirname + '/../.env' })
const Server = require('./server')

const server = new Server()
