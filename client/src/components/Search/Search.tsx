import React from 'react'
import { PulseLoader as Spinner } from 'react-spinners'
import { SearchInput, SearchResults } from './'
import { useSearch } from '../../utils'
import './styles/Search.scss'

interface Props {
    queue: any
}

export const Search: React.FC<Props> = ({ children, queue }) => {
    const { searching, searchUpdate, cancelSearch, search } = useSearch()
    return (
        <div className="search">
            <SearchInput onSearchUpdate={searchUpdate} onCancel={cancelSearch} searching={searching} />
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
                children
            )}
        </div>
    )
}
