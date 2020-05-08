import React, { useState, useEffect } from 'react'
import { TrackType } from '../../utils'
import { Heart, HeartOutline } from '../Common'
import './styles/SearchResults.scss'

interface SearchResultProps {
    tracks: TrackType[]
    onAddTrack: (track: TrackType) => void
    onRemoveTrack: (id: string) => void
}

export const SearchResults: React.FC<SearchResultProps> = ({
    tracks,
    onAddTrack,
    onRemoveTrack,
}: SearchResultProps) => {
    const [queuedTracks, setQueuedTracks] = useState(tracks.map(t => t.id))

    useEffect(() => {
        setQueuedTracks(Array(tracks.length).fill(false))
    }, [tracks])

    const handleAddTrack = (index: number) => {
        if (queuedTracks[index]) {
            onRemoveTrack(tracks[index].queue_id)
        } else {
            onAddTrack(tracks[index])
        }
        const copy = [...queuedTracks]
        copy[index] = !copy[index]
        setQueuedTracks(copy)
    }

    return (
        <div className="list-container">
            <ul className="track-list search-results">
                {tracks.map((track, index) => (
                    <li key={track.queue_id}>
                        <img src={getArtwork(track.album_s)} alt="" />
                        <div className="track-names">
                            <div>
                                <h3>{track.title}</h3>
                            </div>
                            <div>{track.artist}</div>
                        </div>
                        <button onClick={() => handleAddTrack(index)}>
                            <div>{queuedTracks[index] ? <Heart /> : <HeartOutline />}</div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function getArtwork(album: string) {
    if (album.length > 0) {
        return album
    } else {
        return require('../../assets/img/placeholder.png')
    }
}
