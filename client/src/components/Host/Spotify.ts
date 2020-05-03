import { useState, useEffect, createContext, useContext } from 'react'
import {
    SPOTIFY_USER_TOKEN,
    REFRESH_TOKEN_URL,
    SPOTIFY_PLAYER_BASE_URL,
    SPOTIFY_PLAYER_PLAY_URL,
    SPOTIFY_PLAYER_PAUSE_URL,
    SPOTIFY_PLAYER_NEXT_TRACK_URL,
    SPOTIFY_PLAYER_PREVIOUS_TRACK_URL,
    SPOTIFY_PLAYER_SEEK_URL,
    SpotifyToken,
    useAPI,
    tokenHasExpired,
    APIType,
} from '../../utils'

const POLLING_TIMEOUT = 10000

export class SpotifyPlayer {
    playerInterval: null | number
    token: SpotifyToken
    api: APIType
    pollingCallback: null | ((state: SpotifyApi.CurrentPlaybackResponse) => void)
    abortController: AbortController

    constructor(api: APIType) {
        const token: SpotifyToken = JSON.parse(localStorage.getItem(SPOTIFY_USER_TOKEN))
        this.token = token
        this.playerInterval = null
        this.pollingCallback = null
        this.api = api
        this.abortController = new AbortController()
    }

    pollPlayerState = (next: (state: SpotifyApi.CurrentPlaybackResponse) => void) => {
        this.pollingCallback = next
        this.getPlayerState(next)
        this.playerInterval = window.setInterval(() => this.getPlayerState(next), POLLING_TIMEOUT)
    }

    clearPolling = () => {
        if (this.playerInterval) clearInterval(this.playerInterval)
    }

    getPlayerState = (next: (state: SpotifyApi.CurrentPlaybackResponse) => void) => {
        this.request(SPOTIFY_PLAYER_BASE_URL, {}).then(next)
    }

    playTrack = (queue_id: string, id: string) => {
        const config = {
            method: 'PUT',
            body: JSON.stringify({
                uris: [`spotify:track:${id}`],
            }),
        }

        this.abortController.abort()
        this.abortController = new AbortController()

        this.request(SPOTIFY_PLAYER_PLAY_URL, config).then(() => {
            this.getPlayerState(this.pollingCallback)
        })
        this.api.doRemoveTrackFromQueue(queue_id)
    }

    changeTrack = (next: boolean) => {
        const url = next ? SPOTIFY_PLAYER_NEXT_TRACK_URL : SPOTIFY_PLAYER_PREVIOUS_TRACK_URL
        const config = {
            method: 'POST',
        }
        this.request(url, config)
    }

    togglePlayback = (isPlaying: boolean) => {
        const url = isPlaying ? SPOTIFY_PLAYER_PAUSE_URL : SPOTIFY_PLAYER_PLAY_URL
        const config = {
            method: 'PUT',
        }
        this.request(url, config)
    }

    seekInPlayingTrack = (ms: number) => {
        const url = `${SPOTIFY_PLAYER_SEEK_URL}?position_ms=${ms}`
        this.request(url, {})
    }

    refreshToken = (): Promise<void> => {
        console.log('Token expired:', this.token)
        return this.api.doRefreshUserToken(this.token).then(token => {
            this.token = token
        })
    }

    request = (url: string, config: object) => {
        if (tokenHasExpired(this.token)) {
            return this.refreshToken().then(() => this.request(url, config))
        }
        return fetch(url, {
            headers: {
                Authorization: `Bearer ${this.token.access_token}`,
            },
            ...config,
            signal: this.abortController.signal,
        })
            .then(res => {
                if (res.status !== 204) return res.json()
                else return res
            })
            .catch(console.error)
    }
}

export const useSpotify = (): {
    playerState: SpotifyApi.CurrentPlaybackResponse
    controller: SpotifyPlayer
    fetching: boolean
} => {
    const [initialFetch, setInitialFetch] = useState(true)
    const api = useAPI()
    const [spotify, setSpotify] = useState(new SpotifyPlayer(api))
    const [playerState, setPlayerState] = useState<SpotifyApi.CurrentPlaybackResponse>(
        {} as SpotifyApi.CurrentPlaybackResponse,
    )
    useEffect(() => {
        spotify.pollPlayerState((state: SpotifyApi.CurrentPlaybackResponse) => {
            if (initialFetch) setInitialFetch(false)
            setPlayerState(state)
        })
        return spotify.clearPolling
    }, [])
    return { playerState, controller: spotify, fetching: initialFetch }
}
