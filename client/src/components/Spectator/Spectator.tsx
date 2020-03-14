import React from 'react'
import { Header } from '../Common/'
import { PulseLoader as Spinner } from 'react-spinners'
import { TrackList, Search, SearchResults } from './'
import { RouteComponentProps } from 'react-router'
import { TrackType, useSubscribers } from '../../utils'
import './styles/Spectator.scss'
import { useSearch } from '../../utils/helpers'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Spectator: React.FC<Props> = React.memo(({ match }: Props) => {
    const { searching, setSearching, setSearchInput, search } = useSearch()
    const subscribers = useSubscribers(match.params.id)

    const handleCancelSearch = () => {
        setSearching(false)
        search.reset()
    }

    const handleSearchUpdate = (input: string) => {
        setSearchInput(input)
        if (!searching) setSearching(true)
    }

    return (
        <div className="spectator">
            <Header color="green" size="s" numSubscribers={subscribers} />
            <Search onSearchUpdate={handleSearchUpdate} onCancel={handleCancelSearch} />
            {searching ? (
                search.loading ? (
                    <Spinner css={'margin-top: 10vh;'} size={10} color={'white'} />
                ) : search.result && search.result.length > 0 ? (
                    <SearchResults onAddTrack={(s: string) => console.log(s)} tracks={search.result} />
                ) : (
                    <p>No results</p>
                )
            ) : (
                <TrackList onVote={(s: string) => console.log(s)} tracks={TRACKS} />
            )}
        </div>
    )
})

const TRACKS: TrackType[] = [
    {
        title: 'Song title',
        artist: 'Singer',
        artwork: require('../../assets/img/album.jpg'),
        length: 1337,
        votes: 10,
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
