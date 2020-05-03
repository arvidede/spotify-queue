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
    constructor() {
        const token: SpotifyToken = JSON.parse(localStorage.getItem(SPOTIFY_USER_TOKEN))
        this.token = token
        this.playerInterval = null
    }

    pollPlayerState = (next: (state: SpotifyApi.CurrentPlaybackResponse) => void) => {
        this.getPlayerState(next)
        this.playerInterval = window.setInterval(() => this.getPlayerState(next), POLLING_TIMEOUT)
    }

    clearPolling = () => {
        if (this.playerInterval) clearInterval(this.playerInterval)
    }

    getPlayerState = (next: (state: SpotifyApi.CurrentPlaybackResponse) => void) => {
        this.request(SPOTIFY_PLAYER_BASE_URL, {}).then(next)
    }

    playTrack = (id: string) => {
        const config = {
            method: 'PUT',
            body: JSON.stringify({
                uris: [`spotify:track:${id}`],
            }),
        }
        this.request(SPOTIFY_PLAYER_PLAY_URL, config)
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
        return fetch(`${REFRESH_TOKEN_URL}?refresh_token=${this.token.refresh_token}`)
            .then(res => res.json())
            .then((res: { data: SpotifyToken }) => {
                const token = res.data
                token.refresh_token = this.token.refresh_token
                token.expires_on = Date.now() + token.expires_in * 1000
                localStorage.setItem(SPOTIFY_USER_TOKEN, JSON.stringify(token))
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
        })
            .then(res => {
                if (res.status !== 204) return res.json()
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
    const spotify = new SpotifyPlayer()
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
