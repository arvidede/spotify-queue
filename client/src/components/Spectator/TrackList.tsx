import React from 'react'
import { TrackType } from '../../utils'
import './styles/TrackList.scss'

interface TrackListProps {
    tracks: TrackType[]
}

export const TrackList: React.FC<TrackListProps> = ({ tracks }: TrackListProps) => {
    return (
        <ul className="track-list">
            <li>
                <div>TITLE</div>
                <div>ARTIST</div>
                <div>VOTES</div>
            </li>
            {tracks.map((track, index) => (
                <li key={track.title + Math.random()}>
                    <div>{track.title}</div>
                    <div>{track.artist}</div>
                    <div>{track.votes}</div>
                </li>
            ))}
        </ul>
    )
}
