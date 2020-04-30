import React from 'react'
import { Header } from '../Common/'
import { PulseLoader as Spinner } from 'react-spinners'
import { TrackList, Search, SearchResults } from './'
import { RouteComponentProps } from 'react-router'
import { TrackType, useWebSocket, useAPI, useSearch, useQueue } from '../../utils'
import './styles/Spectator.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Spectator: React.FC<Props> = React.memo(({ match }: Props) => {
    const { searching, searchUpdate, cancelSearch, search } = useSearch()
    const { subscribers, queue } = useWebSocket(match.params.id)
    const api = useAPI()

    return (
        <div className="spectator">
            <Header color="green" size="s" numSubscribers={subscribers} />
            <Search onSearchUpdate={searchUpdate} onCancel={cancelSearch} searching={searching} />
            {searching ? (
                search.loading ? (
                    <Spinner css={'margin-top: 10vh;'} size={10} color={'white'} />
                ) : search.result && search.result.length > 0 ? (
                    <SearchResults
                        onAddTrack={queue.addToQueue}
                        onRemoveTrack={queue.removeFromQueue}
                        tracks={search.result}
                    />
                ) : (
                    <p>No results</p>
                )
            ) : (
                <TrackList onVote={queue.vote} votes={queue.votes} tracks={queue.tracks} />
            )}
        </div>
    )
})
