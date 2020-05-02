/* Spotify */
export const CLIENT_TOKEN = process.env.CLIENT_TOKEN
export const CLIENT_TOKEN_SECRET = process.env.CLIENT_TOKEN_SECRET
export const USER_AUTH_URL = 'https://accounts.spotify.com/authorize'
export const TOKEN_URL = 'https://accounts.spotify.com/api/token'
export const BASE_URL = 'https://api.spotify.com'
export const SEARCH_URL = BASE_URL + '/v1/search'
export const TRACK_URL = BASE_URL + '/v1/tracks'
export const REDIRECT_URL = 'http://localhost:3000/redirect'

export const TOKEN_BASE_64 = new Buffer(
    `${CLIENT_TOKEN}:${CLIENT_TOKEN_SECRET}`,
).toString('base64')

export const APP_TOKEN_TEMPLATE = {
    access_token: '',
    token_type: '',
    expires_in: 0,
}

export const USER_TOKEN_TEMPLATE = {
    access_token: '',
    token_type: '',
    scope: '',
    expires_in: 0,
    refresh_token: '',
}

export const SCOPES = [
    'streaming',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-read-private',
]

/* Firebase */
export const DATABASE_URL = 'https://queue-1337.firebaseio.com'
export const COLLECTIONS = {
    QUEUE: 'queue',
}

/* Misc */
export const PORT = process.env.PORT || 8081
