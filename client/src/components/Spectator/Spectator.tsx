import React, { useEffect, useState } from 'react'
import { Header } from '../Common/'
import { PulseLoader as Spinner } from 'react-spinners'
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
    const [searchResults, setSearchResults] = useState<TrackType[] | never[]>([])

    useEffect(() => {
        api.doJoinRoom(match.params.id)
        api.onSubscribe = (n: number) => setSubscribers(n)
    })

    const handleSearch = (query: string) => {
        setIsSearching(true)
        api.doSearchTrack(query).then(({ tracks }) => {
            console.log(tracks)
            setIsSearching(false)
            setSearchResults(tracks)
        })
    }

    const handleCancelSearch = () => {
        setIsSearching(false)
        setSearchResults([])
    }

    return (
        <div className="spectator">
            <Header color="green" size="s" numSubscribers={subscribers} />
            <Search onSearch={handleSearch} isSearching={isSearching} onCancel={handleCancelSearch} />
            {isSearching ? (
                <Spinner css={'margin-top: 10vh;'} size={10} color={'white'} />
            ) : searchResults.length > 0 ? (
                <SearchResults tracks={TRACKS} />
            ) : (
                <TrackList tracks={TRACKS} />
            )}
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
