export interface TrackType extends Partial<SpotifyApi.TrackObjectFull> {
    title: string
    artist: string
    artwork: string
    length: number
    votes: number
}

export interface SpotifyToken {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token: string
    expires_on: number
}
