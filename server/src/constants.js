/* Spotify */
export const CLIENT_TOKEN = process.env.CLIENT_TOKEN
export const CLIENT_TOKEN_SECRET = process.env.CLIENT_TOKEN_SECRET
export const TOKEN_URL = 'https://accounts.spotify.com/api/token'
export const BASE_URL = 'https://api.spotify.com'
export const SEARCH_URL = BASE_URL + '/v1/search'

export const TOKEN_BASE_64 = new Buffer(
    `${CLIENT_TOKEN}:${CLIENT_TOKEN_SECRET}`,
).toString('base64')

/* Firebase */
export const DATABASE_URL = 'https://queue-1337.firebaseio.com'
