import React from 'react'
import { TrackType } from '../../utils'
import './styles/TrackList.scss'

interface TrackListProps {
    tracks: TrackType[]
    onDelete: (id: string) => void
    onPlay: (queue_id: string, id: string) => void
}

export const TrackList: React.FC<TrackListProps> = ({
    tracks,
    onDelete,
    onPlay,
}: TrackListProps) => {
    return (
        <div className="host-content-inner">
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
                        <div>
                            <button onClick={() => onDelete(track.queue_id)}>D</button>
                        </div>
                        <div>
                            <button onClick={() => onPlay(track.queue_id, track.id)}>P</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
