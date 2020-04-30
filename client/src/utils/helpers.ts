import { SpotifyToken, TrackType } from './types'

export const validateRoomID = (s: string): boolean => {
    // return s.length === 6 && Number.isInteger(Number(s.substr(1, 6))) && !s.includes(' ')
    return s.length === 6 && !s.includes(' ')
}

export const tokenHasExpired = (token: SpotifyToken): boolean => {
    return token.expires_on < Date.now()
}

export const Fetch = (url: string, method: string = 'GET', body?: any, signal?: AbortSignal) =>
    fetch(url, {
        signal,
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    })
        .then(gatherResponse)
        .catch(console.error)

async function gatherResponse(response: any): Promise<any> {
    if (response.status !== 200) {
        throw new Error('Bad status = ' + response.status)
    }
    return await response.json()

    // const { headers } = response
    // const contentType = headers.get('content-type')
    // if (contentType.includes('application/json')) {
    //     return await response.json()
    // } else if (contentType.includes('application/text')) {
    //     return await response.json()
    // } else if (contentType.includes('text/html')) {
    //     return await response.json()
    // } else {
    //     return await response.json()
    // }
}

export const placeHolderTracks = (n: number): TrackType[] => {
    return Array(n)
        .fill('')
        .map(() => ({
            title: 'Song title',
            artist: 'Singer',
            album_s: require('../assets/img/album.jpg'),
            album_m: require('../assets/img/album.jpg'),
            album_l: require('../assets/img/album.jpg'),
            length: 1337,
            votes: 1,
            id: Math.random(),
        }))
}
