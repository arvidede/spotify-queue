import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { HOST_URL } from './constants'

export interface APIType {
    doSetupRoom: () => Promise<string>
}

export class API {
    constructor() {}

    doSetupRoom = async (): Promise<string> => {
        const response = await parsedFetch(HOST_URL)
        // Cookies.set('id', response)
        console.log(response)
        return String(response)
    }
}

async function gatherResponse(response: any): Promise<any> {
    const { headers } = response
    const contentType = headers.get('content-type')
    if (contentType.includes('application/json')) {
        return await response.json()
    } else if (contentType.includes('application/text')) {
        return await response.text()
    } else if (contentType.includes('text/html')) {
        return await response.text()
    } else {
        return await response.text()
    }
}

export const APIContext = React.createContext<APIType>(new API())

export const useAPI = () => useContext(APIContext)

export const parsedFetch = (url: string) => fetch(url, { credentials: 'include' }).then(gatherResponse)
