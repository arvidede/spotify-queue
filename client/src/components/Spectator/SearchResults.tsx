import React from 'react'
import { TrackType } from '../../utils'
import './styles/SearchResults.scss'

interface SearchResultProps {
    tracks: TrackType[]
    onAddTrack: (track: TrackType) => void
}

const img = require('../../assets/img/album.jpg')

export const SearchResults: React.FC<SearchResultProps> = ({ tracks, onAddTrack }: SearchResultProps) => {
    return (
        <div className="list-container">
            <ul className="track-list">
                {tracks.map((track, index) => (
                    <li key={track.id}>
                        <img src={getArtwork(track.album as SpotifyApi.AlbumObjectSimplified)} alt="" />
                        <div className="track-names">
                            <div>
                                <h3>{track.name}</h3>
                            </div>
                            <div>{track.artists[0].name}</div>
                        </div>
                        <button onClick={() => onAddTrack(track)}>&#65291;</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function getArtwork(album: SpotifyApi.AlbumObjectSimplified) {
    if (album.images.length > 2) {
        return album.images[1].url
    } else {
        return require('../../assets/img/album.jpg')
    }
}
