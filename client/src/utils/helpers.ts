import { SpotifyToken, TrackType } from './types'
import { VOTED_TRACKS } from './constants'

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

export const setVote = (id: string, vote: boolean) => {
    let votes = getVotes()
    if (vote) votes.push(id)
    else votes = votes.filter(v => v !== id)
    localStorage.setItem(VOTED_TRACKS, JSON.stringify(votes))
}

export const getVotes = () => {
    const votes = localStorage.getItem(VOTED_TRACKS)
    if (!votes) {
        setupLocalStorage()
        return []
    }
    return JSON.parse(votes)
}

const setupLocalStorage = () => {
    localStorage.setItem(VOTED_TRACKS, JSON.stringify([]))
}
