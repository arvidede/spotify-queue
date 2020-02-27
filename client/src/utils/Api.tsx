import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { HOST_URL, VALIDATE_ROOM_URL, validateRoomId, parsedFetch } from './'
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
}

export class API implements APIType {
    ws: WebSocket

    constructor() {
        this.ws = new WebSocket(SOCKET_URL)
        this.connect()
    }

    connect = () => {
        this.ws.onopen = () => {
            console.log('Open socket')
        }

        this.ws.onmessage = (e: any) => {
            const message = e.data as string
            switch (message) {
                case 'spectator':
                    break
                default:
                    break
            }
        }

        this.ws.onclose = () => {
            console.log('Close socket')
            setTimeout(this.check, 1000)
        }

        this.ws.onerror = () => {
            this.ws.close()
        }
    }

    check = () => {
        //check if websocket instance is closed, if so call `connect` function.
        if (!this.ws || this.ws.readyState === WebSocket.CLOSED) this.connect()
    }

    doJoinRoom = (id: string) => {
        const message = Message('join', id)
        const interval = setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(message)
                clearInterval(interval)
            }
        }, 1000)
    }

    doSetupRoom = async (): Promise<string> => {
        const response = await parsedFetch(HOST_URL)
        // Cookies.set('id', response)
        return String(response)
    }

    isValidRoomId = async (id: string): Promise<boolean> => {
        return validateRoomId(id) && ((await parsedFetch(VALIDATE_ROOM_URL, { id }, 'POST')) as boolean)
    }
}

export const APIContext = React.createContext<APIType>({} as APIType)

export const useAPI = (): APIType => useContext(APIContext)
