import React from 'react'
import { Header } from '../Common/'
import { PulseLoader as Spinner } from 'react-spinners'
import { TrackList, Search, SearchResults } from './'
import { RouteComponentProps } from 'react-router'
import { TrackType, useSubscribers, useAPI, useSearch, useQueue } from '../../utils'
import './styles/Spectator.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Spectator: React.FC<Props> = React.memo(({ match }: Props) => {
    const { searching, setSearching, setSearchInput, search } = useSearch()
    const queue = useQueue()

    const subscribers = useSubscribers(match.params.id)
    const api = useAPI()

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
                    <SearchResults onAddTrack={queue.addToQueue} tracks={search.result} />
                ) : (
                    <p>No results</p>
                )
            ) : (
                <TrackList onVote={(s: string) => console.log(s)} tracks={queue.tracks} />
            )}
        </div>
    )
})
