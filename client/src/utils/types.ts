export interface TrackType extends Partial<SpotifyApi.TrackObjectFull> {
    title: string
    artist: string
    artwork: string
    length: number
    votes: number
}
