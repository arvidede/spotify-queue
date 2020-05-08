import React from 'react'
import { TrackType } from '../../utils'
import { Play, Close } from '../Common'
import './styles/TrackList.scss'

interface TrackListProps {
    tracks: TrackType[]
    onDelete: (id: string) => void
    onPlay: (id: string, queue_id: string) => void
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, onDelete, onPlay }: TrackListProps) => {
    return (
        <ul className="host-track-list">
            <li>
                <div>TITLE</div>
                <div>ARTIST</div>
                <div>VOTES</div>
            </li>
            {tracks.map((track, index) => (
                <li key={track.id}>
                    <div>{track.title}</div>
                    <div>{track.artist}</div>
                    <div>{track.votes}</div>
                    <button onClick={() => onPlay(track.id, track.queue_id)}>
                        <Play />
                    </button>
                    <button onClick={() => onDelete(track.queue_id)}>
                        <Close />
                    </button>
                </li>
            ))}
        </ul>
    )
}
