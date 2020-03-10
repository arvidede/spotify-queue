import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { HOST_URL, VALIDATE_ROOM_URL, SEARCH_URL, validateRoomID, parsedFetch, TrackType } from './'
import { SOCKET_URL, AUTHORIZE_URL, REQUEST_TOKEN_URL, SPOTIFY_USER_TOKEN, REFRESH_TOKEN_URL } from './constants'
import { SpotifyToken } from './types'
import { resolve } from 'dns'
import { rejects } from 'assert'
import { tokenHasExpired } from './helpers'

const Message = (type: string, payload: string): string => {
    return JSON.stringify({
        type,
        payload,
    })
}
export interface APIType {
    doSetupRoom: () => Promise<string>
    doJoinRoom: (id: string) => void
    doValidateRoomID: (id: string) => Promise<boolean>
    ws: WebSocket
    connect: () => void
    check: () => void
    host: boolean
    onSubscribe: (n: number) => void
    doSearchTrack: (search: string, signal: AbortSignal) => Promise<TrackType[]>
    doAuthorizeUser: () => Promise<unknown>
    doFetchUserToken: (code: string) => Promise<SpotifyToken>
    window: Window | null
    token: SpotifyToken | null
}

export class API implements APIType {
    ws: WebSocket
    host: boolean
    onSubscribe: (n: number) => void
    window: Window | null
    token: SpotifyToken | null

    constructor() {
        this.window = null
        this.ws = new WebSocket(SOCKET_URL)
        this.connect()
        this.host = false
        this.onSubscribe = (n: number) => {}
    }

    connect = () => {
        this.ws.onopen = () => {
            console.log('Open socket')
        }

        this.ws.onmessage = (e: any) => {
            const message = JSON.parse(e.data)
            switch (message.type) {
                case 'spectator':
                    break
                case 'noSubscribers':
                    this.onSubscribe(message.payload as number)
                    break
                case 'leave':
                    this.onSubscribe(message.payload as number)
                    break
                // case 'host':
                // if(this.host)
                default:
                    break
            }
        }

        this.ws.onclose = (par: any) => {
            console.log('Close socket', par)
            setTimeout(this.check, 1000)
        }

        this.ws.onerror = (err: any) => {
            console.error('Socket error', err)
            this.ws.close()
        }
    }

    check = () => {
        /* check if websocket instance is closed, if so call `connect` function. */
        if (!this.ws || this.ws.readyState === WebSocket.CLOSED) this.connect()
    }

    doSendMessage = (type: string, payload: string) => {
        const message = Message(type, payload)
        const interval = setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(message)
                clearInterval(interval)
            }
        }, 1000)
    }

    doJoinRoom = (id: string) => {
        this.doSendMessage('join', id)
    }

    doAuthorizeUser = () => {
        return new Promise((resolve, reject) => {
            const token: SpotifyToken = JSON.parse(localStorage.getItem(SPOTIFY_USER_TOKEN))

            if (token && !tokenHasExpired(token)) {
                this.token = token
                return resolve()
            }

            return parsedFetch(AUTHORIZE_URL, null, 'GET').then((res: { data: string }) => {
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
        return parsedFetch(`${REQUEST_TOKEN_URL}?code=${code}`).then(res => res.data)
    }

    doRefreshUserToken = (code: string) => {
        return parsedFetch(`${REFRESH_TOKEN_URL}?refresh_token=${this.token.refresh_token}`).then(res => res.data)
    }

    doSetupRoom = async (): Promise<string> => {
        const response: { data: string } = await parsedFetch(HOST_URL)
        this.host = true
        this.doSendMessage('host', response.data)
        // Cookies.set('id', response)
        return response.data
    }

    doValidateRoomID = async (id: string): Promise<boolean> => {
        return validateRoomID(id) && ((await parsedFetch(`${VALIDATE_ROOM_URL}?id=${id}`)) as { data: boolean }).data
    }

    doSearchTrack = async (search: string, signal: AbortSignal): Promise<TrackType[]> => {
        const response: { data: { items: TrackType[] } } = await parsedFetch(
            `${SEARCH_URL}?query=${search}`,
            null,
            'GET',
            signal,
        )

        return response.data.items
    }
}

export const APIContext = React.createContext<APIType>({} as APIType)

export const useAPI = (): APIType => useContext(APIContext)
