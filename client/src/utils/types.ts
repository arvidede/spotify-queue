export interface APIType {
    connect: () => void
    check: () => void
    ping: () => void
    doAddTrackToQueue: (track: string) => Promise<string>
    doRemoveTrackFromQueue: (track: string) => Promise<unknown>
    doVoteForTrack: (track: string, vote: boolean) => void
    doAuthorizeUser: () => Promise<unknown>
    doFetchUserToken: (code: string) => Promise<void>
    doRefreshUserToken: (token: SpotifyToken) => Promise<SpotifyToken>
    doGetQueue: () => Promise<TrackType[]>
    doJoinRoom: (id: string, callbacks: object) => void
    doLeaveRoom: () => void
    doSearchTrack: (search: string, signal: AbortSignal) => Promise<TrackType[]>
    doSetupRoom: () => Promise<string>
    doValidateRoomID: (id: string) => Promise<boolean>
    ws: WebSocket
    host: boolean
    window: Window | null
    roomID: string
    inSession: boolean
}

export interface TrackType extends Partial<SpotifyApi.TrackObjectFull> {
    title: string
    artist: string
    album_s: string
    album_m: string
    album_l: string
    length: number
    votes: number
    id: any
    queue_id?: string
}

export interface SpotifyToken {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token: string
    expires_on: number
}

export interface Response<T> {
    data: T
}
