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
