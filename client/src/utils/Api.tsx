import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import {
    SOCKET_URL,
    AUTHORIZE_URL,
    REQUEST_TOKEN_URL,
    SPOTIFY_USER_TOKEN,
    REFRESH_TOKEN_URL,
    GET_QUEUE_URL,
    ADD_TRACK_TO_QUEUE_URL,
    REMOVE_TRACK_FROM_QUEUE_URL,
    HOST_URL,
    VALIDATE_ROOM_URL,
    SEARCH_URL,
    validateRoomID,
    Fetch,
    TrackType,
    tokenHasExpired,
    SpotifyToken,
} from './'

const Message = (type: string, payload: string | object): string => {
    return JSON.stringify({
        type,
        payload,
    })
}
export interface APIType {
    connect: () => void
    check: () => void
    doAddTrackToQueue: (track: string) => Promise<string>
    doRemoveTrackFromQueue: (track: string) => Promise<unknown>
    doVoteForTrack: (track: string, vote: boolean) => void
    doAuthorizeUser: () => Promise<unknown>
    doFetchUserToken: (code: string) => Promise<SpotifyToken>
    doGetQueue: () => Promise<TrackType[]>
    doJoinRoom: (id: string, callbacks: object) => void
    doLeaveRoom: () => void
    doSearchTrack: (search: string, signal: AbortSignal) => Promise<TrackType[]>
    doSetupRoom: () => Promise<string>
    doValidateRoomID: (id: string) => Promise<boolean>
    ws: WebSocket
    host: boolean
    window: Window | null
    token: SpotifyToken | null
    roomID: string
    inSession: boolean
}

export class API implements APIType {
    ws: WebSocket
    host: boolean
    window: Window | null
    token: SpotifyToken | null
    roomID: string
    inSession: boolean

    constructor() {
        this.window = null
        this.roomID = ''
        this.inSession = false
        this.ws = null
        this.host = false
    }

    connect = () => {
        this.ws = new WebSocket(SOCKET_URL)

        this.ws.onopen = () => {
            console.log('Open socket')
        }

        this.ws.onclose = (par: any) => {
            console.log('Close socket', par)
            this.ws = null
            setTimeout(this.check, 1000)
        }

        this.ws.onerror = (err: any) => {
            console.error('Socket error', err)
            this.ws.close()
        }
    }

    check = () => {
        /* check if websocket instance is closed, if so call `connect` function. */
        if (this.inSession && (!this.ws || this.ws.readyState === WebSocket.CLOSED)) this.connect()
    }

    doSendMessage = (type: string, payload: string | object) => {
        const message = Message(type, payload)
        const interval = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(message)
                clearInterval(interval)
            }
        }, 1000)
    }

    doJoinRoom = (id: string, cb: any) => {
        if (!this.ws) this.connect()

        this.ws.onmessage = (e: any) => {
            const message = JSON.parse(e.data)
            switch (message.type) {
                case 'spectator':
                    break
                case 'numSubscribers':
                    cb.setSubscribers(message.payload as number)
                    break
                case 'leave':
                    cb.setSubscribers(message.payload as number)
                    break
                case 'trackAdded':
                    cb.addTrackToQueue(message.payload as TrackType)
                    break
                case 'trackRemoved':
                    cb.removeTrackFromQueue(message.payload as string)
                    break
                case 'vote':
                    cb.vote(message.payload as { votes: number; id: string })
                    break
                default:
                    break
            }
        }

        this.roomID = id
        if (!this.inSession) this.doSendMessage('join', id)
        this.inSession = true
    }

    doLeaveRoom = () => {
        this.inSession = false
        this.roomID = ''
        this.ws.close()
    }

    doAuthorizeUser = () => {
        return new Promise((resolve, reject) => {
            const token: SpotifyToken = JSON.parse(localStorage.getItem(SPOTIFY_USER_TOKEN))

            if (token && !tokenHasExpired(token)) {
                this.token = token
                return resolve()
            }

            return Fetch(AUTHORIZE_URL, 'GET').then((res: { data: string }) => {
                const width = 450,
                    height = 730,
                    left = window.screen.width / 2 - width / 2,
                    top = window.screen.height / 2 - height / 2

                this.window = window.open(
                    res.data,
                    'Spotify',
                    'menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=' +
                        `${width},height=${height},top=${top},left=${left}`,
                )

                this.window.onbeforeunload = () => {
                    this.token = JSON.parse(localStorage.getItem(SPOTIFY_USER_TOKEN))
                    resolve()
                }
            })
        })
    }

    doFetchUserToken = (code: string) => {
        return Fetch(`${REQUEST_TOKEN_URL}?code=${code}`).then(res => res.data)
    }

    doRefreshUserToken = (code: string) => {
        return Fetch(`${REFRESH_TOKEN_URL}?refresh_token=${this.token.refresh_token}`).then(res => res.data)
    }

    doSetupRoom = async (): Promise<string> => {
        const response: { data: string } = await Fetch(HOST_URL)
        this.host = true
        this.connect()
        this.doSendMessage('host', response.data)
        return response.data
    }

    doValidateRoomID = async (id: string): Promise<boolean> => {
        return validateRoomID(id) && ((await Fetch(`${VALIDATE_ROOM_URL}?id=${id}`)) as { data: boolean }).data
    }

    doSearchTrack = async (search: string, signal: AbortSignal): Promise<TrackType[]> => {
        const response: { data: TrackType[] } = await Fetch(`${SEARCH_URL}?query=${search}`, 'GET', null, signal)
        return response.data
    }

    doGetQueue = async (): Promise<TrackType[]> => {
        const response: { data: { tracks: TrackType[] } } = await Fetch(`${GET_QUEUE_URL}?id=${this.roomID}`)
        return response.data.tracks
    }

    doAddTrackToQueue = async (id: string): Promise<string> => {
        const response: { data: string } = await Fetch(
            `${ADD_TRACK_TO_QUEUE_URL}?trackID=${id}&sessionID=${this.roomID}`,
            'PUT',
        )
        return response.data
    }

    doRemoveTrackFromQueue = async (id: string) => {
        Fetch(`${REMOVE_TRACK_FROM_QUEUE_URL}?trackID=${id}&sessionID=${this.roomID}`, 'DELETE')
    }

    doVoteForTrack = async (id: string, vote: boolean) => {
        this.doSendMessage('vote', { id, vote, room: this.roomID })
    }
}

export const APIContext = React.createContext<APIType>({} as APIType)

export const useAPI = (): APIType => useContext(APIContext)
