/* URLs */
export const BASE_URL = 'http://localhost:8081/'
export const SOCKET_URL = 'ws://localhost:8081'
export const HOST_URL = BASE_URL + 'host'
export const SEARCH_URL = BASE_URL + 'search'
export const VALIDATE_ROOM_URL = BASE_URL + 'validate'
export const AUTHORIZE_URL = BASE_URL + 'authorize'
export const REQUEST_TOKEN_URL = BASE_URL + 'token'
export const REFRESH_TOKEN_URL = BASE_URL + 'refresh'
export const GET_QUEUE_URL = BASE_URL + 'get-queue'
export const ADD_TRACK_TO_QUEUE_URL = BASE_URL + 'add-to-queue'
export const REMOVE_TRACK_FROM_QUEUE_URL = BASE_URL + 'remove-from-queue'

/* Spotify API */
export const SPOIFY_BASE_URL = 'https://api.spotify.com/v1'
export const SPOTIFY_PLAYER_RECOMMENDATION_URL = SPOIFY_BASE_URL + '/recommendations'
export const SPOTIFY_PLAYER_BASE_URL = SPOIFY_BASE_URL + '/me/player'
export const SPOTIFY_PLAYER_PLAY_URL = SPOTIFY_PLAYER_BASE_URL + '/play'
export const SPOTIFY_PLAYER_PAUSE_URL = SPOTIFY_PLAYER_BASE_URL + '/pause'
export const SPOTIFY_PLAYER_NEXT_TRACK_URL = SPOTIFY_PLAYER_BASE_URL + '/next'
export const SPOTIFY_PLAYER_PREVIOUS_TRACK_URL = SPOTIFY_PLAYER_BASE_URL + '/previous'
export const SPOTIFY_PLAYER_SEEK_URL = SPOTIFY_PLAYER_BASE_URL + '/seek'
export const SPOTIFY_PLAYER_GET_DEVICES_URL = SPOTIFY_PLAYER_BASE_URL + '/devices'
export const SPOTIFY_PLAYER_SET_DEVICE_URL = SPOTIFY_PLAYER_BASE_URL

/* Localstorage */
export const SPOTIFY_USER_TOKEN = 'spotify_user_token'
export const VOTED_TRACKS = 'votes'
export const LAST_PLAYED_TRACK = 'last_played_track'
