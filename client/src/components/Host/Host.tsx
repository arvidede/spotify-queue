import React, { useEffect, useState } from 'react'
import { Header } from '../Common/'
import { RouteComponentProps } from 'react-router'
import { TrackType, useSubscribers } from '../../utils'
import './styles/Host.scss'
import { Player, TrackList } from './'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Host: React.FC<Props> = (props: Props) => {
    const [track, setTrack] = useState<number>(0)
    const subscribers = useSubscribers(props.match.params.id)

    return (
        <div className="host">
            <Header color="green" size="s" numSubscribers={subscribers} id={props.match.params.id} />
            <div className="host-content">
                <Player track={TRACKS[track]} />
                <TrackList tracks={TRACKS} />
            </div>
        </div>
    )
}

const TRACKS: TrackType[] = [
    {
        title: 'Song title',
        artist: 'Singer',
        artwork: require('../../assets/img/album.jpg'),
        length: 1337,
        votes: 1,
    },
    {
        title: 'Song title',
        artist: 'Singer',
        artwork: require('../../assets/img/album.jpg'),
        length: 1337,
        votes: 1,
    },
    {
        title: 'Song title',
        artist: 'Singer',
        artwork: require('../../assets/img/album.jpg'),
        length: 1337,
        votes: 1,
    },
    {
        title: 'Song title',
        artist: 'Singer',
        artwork: require('../../assets/img/album.jpg'),
        length: 1337,
        votes: 1,
    },
]
