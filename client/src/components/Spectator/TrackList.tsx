import React from 'react'
import { TrackType } from '../../utils'
import { Heart, HeartOutline } from '../Common'
import './styles/TrackList.scss'

interface TrackListProps {
    tracks: TrackType[]
    votes: string[]
    onVote: (id: string, voted: boolean) => void
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, votes, onVote }: TrackListProps) => {
    return (
        <div className="list-container">
            <ul className="track-list">
                {tracks.map((track, index) => {
                    const hasVoted = votes.includes(track.queue_id)
                    return (
                        <li key={track.queue_id}>
                            <img src={track.album_s} alt="" />
                            <div className="track-names">
                                <div>
                                    <h3>{track.title}</h3>
                                </div>
                                <div>{track.artist}</div>
                            </div>
                            <div>
                                <div>
                                    {track.votes} vote{track.votes !== 1 && 's'}
                                </div>
                                <button onClick={() => onVote(track.queue_id, !hasVoted)}>
                                    {hasVoted ? <Heart /> : <HeartOutline />}
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
