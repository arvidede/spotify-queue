import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { HOST_URL, VALIDATE_ROOM_URL, SEARCH_URL, validateRoomId, parsedFetch, TrackType } from './'
import { SOCKET_URL } from './constants'

const Message = (type: string, payload: string): string => {
    return JSON.stringify({
        type,
        payload,
    })
}
export interface APIType {
    doSetupRoom: () => Promise<string>
    doJoinRoom: (id: string) => void
    isValidRoomId: (id: string) => Promise<boolean>
    ws: WebSocket
    connect: () => void
    check: () => void
    host: boolean
    onSubscribe: (n: number) => void
    doSearchTrack: (search: string) => Promise<{ tracks: TrackType[] }>
}

export class API implements APIType {
    ws: WebSocket
    host: boolean
    onSubscribe: (n: number) => void

    constructor() {
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

    doSetupRoom = async (): Promise<string> => {
        const response = await parsedFetch(HOST_URL)
        this.host = true
        this.doSendMessage('host', response as string)
        // Cookies.set('id', response)
        return String(response)
    }

    isValidRoomId = async (id: string): Promise<boolean> => {
        return validateRoomId(id) && ((await parsedFetch(VALIDATE_ROOM_URL, { id }, 'POST')) as boolean)
    }

    doSearchTrack = async (search: string): Promise<{ tracks: TrackType[] }> => {
        const response = await parsedFetch(`${SEARCH_URL}?query=${search}`)
        console.log(response)
        return response as Promise<{ tracks: TrackType[] }>
    }
}

export const APIContext = React.createContext<APIType>({} as APIType)

export const useAPI = (): APIType => useContext(APIContext)
