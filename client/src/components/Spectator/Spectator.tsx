import React, { useEffect, useState } from 'react'
import { Header } from '../Common/'
import { TrackList, Search, SearchResults } from './'
import { RouteComponentProps } from 'react-router'
import { useAPI, TrackType } from '../../utils'
import './styles/Spectator.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Spectator: React.FC<Props> = ({ match }: Props) => {
    const api = useAPI()
    const [subscribers, setSubscribers] = useState<number>(1)
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        api.doJoinRoom(match.params.id)
        api.onSubscribe = (n: number) => setSubscribers(n)
    })

    return (
        <div className="spectator">
            <Header color="green" size="s" numSubscribers={subscribers} />
            <Search />
            {isSearching ? <SearchResults tracks={TRACKS} /> : <TrackList tracks={TRACKS} />}
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
