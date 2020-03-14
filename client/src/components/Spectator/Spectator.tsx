import React, { useEffect, useState } from 'react'
import { Header } from '../Common/'
import { PulseLoader as Spinner } from 'react-spinners'
import { TrackList, Search, SearchResults } from './'
import { RouteComponentProps } from 'react-router'
import { TrackType, useSubscribers, useAPI } from '../../utils'
import './styles/Spectator.scss'
import { useSearch } from '../../utils/helpers'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Spectator: React.FC<Props> = React.memo(({ match }: Props) => {
    const { searching, setSearching, setSearchInput, search } = useSearch()
    const [queue, setQueue] = useState<TrackType[]>([])

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

    useEffect(() => {
        api.doGetQueue().then(setQueue)
    }, [api])

    const handleAddTrackToQueue = (track: string) => {
        api.doAddTrackToQueue(track)
    }

    return (
        <div className="spectator">
            <Header color="green" size="s" numSubscribers={subscribers} />
            <Search onSearchUpdate={handleSearchUpdate} onCancel={handleCancelSearch} />
            {searching ? (
                search.loading ? (
                    <Spinner css={'margin-top: 10vh;'} size={10} color={'white'} />
                ) : search.result && search.result.length > 0 ? (
                    <SearchResults onAddTrack={handleAddTrackToQueue} tracks={search.result} />
                ) : (
                    <p>No results</p>
                )
            ) : (
                <TrackList onVote={(s: string) => console.log(s)} tracks={queue} />
            )}
        </div>
    )
})
