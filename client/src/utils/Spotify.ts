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
    SPOTIFY_PLAYER_RECOMMENDATION_URL,
    TrackType,
    LAST_PLAYED_TRACK,
} from '.'

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

    playTrack = (id: string, queue_id?: string) => {
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
        if (queue_id) this.api.doRemoveTrackFromQueue(queue_id)
    }

    playSimilarTrack = () => {
        const id = localStorage.getItem(LAST_PLAYED_TRACK)
        const config = {
            method: 'GET',
        }
        const url = `${SPOTIFY_PLAYER_RECOMMENDATION_URL}?seed_tracks=${id}&limit=1`
        this.request(url, config).then(({ tracks }: { tracks: TrackType[] }) => {
            if (tracks && tracks.length > 0) {
                this.playTrack(tracks[0].id)
            }
        })
    }

    changeTrack = (next: boolean = true) => {
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
        const config = { method: 'PUT' }
        this.request(url, config)
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
                if (res.status === 400) console.error(res.json())
                if (res.status !== 204) return res.json()
                else return res
            })
            .catch(err => console.error('Spotify API responded with error:', err))
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
            if (state.item) localStorage.setItem(LAST_PLAYED_TRACK, state.item.id)
        })
        return spotify.clearPolling
    }, [])
    return { playerState, controller: spotify, fetching: initialFetch }
}
