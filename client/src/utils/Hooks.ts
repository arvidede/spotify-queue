import { useState, useEffect, useRef, useCallback } from 'react'
import { useAsyncAbortable } from 'react-async-hook'
import { useHistory } from 'react-router-dom'
import { useAPI, TrackType, getVotes, setVote as setVoteInStorage } from '.'

export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export const useDebouncedInput = (onUpdate: any, onCancel: any) => {
    const [input, setInput] = useState('')
    const debouncedInput = useDebounce(input, 400)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (input === '' && e.target.value.length > 0) {
            onUpdate(e.target.value)
        } else if (e.target.value.length === 0) {
            onCancel()
        }
        setInput(e.target.value)
    }

    useEffect(() => {
        if (debouncedInput && input.length > 0) {
            onUpdate(debouncedInput)
        }
    }, [debouncedInput])

    return { input, setInput, handleInputChange }
}

export const useSearch = () => {
    const [searchInput, setSearchInput] = useState('')
    const [searching, setSearching] = useState(false)
    const api = useAPI()

    const search = useAsyncAbortable(
        async (abortSignal, text) => {
            if (text.length === 0) {
                return []
            } else {
                return api.doSearchTrack(text, abortSignal)
            }
        },
        [searchInput],
    )

    const handleCancelSearch = useCallback(() => {
        setSearchInput('')
        setSearching(false)
        search.reset()
    }, [search])

    const handleSearchUpdate = (input: string) => {
        setSearchInput(input)
        if (!searching) setSearching(true)
    }

    useEffect(() => {
        const handleEscapePressed = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && searching) {
                handleCancelSearch()
            }
        }
        document.addEventListener('keydown', handleEscapePressed)
        return () => {
            document.removeEventListener('keydown', handleEscapePressed)
        }
    }, [searching, handleCancelSearch])

    return { searching, cancelSearch: handleCancelSearch, searchUpdate: handleSearchUpdate, search }
}

export const useRoomValidation = () => {}

export const useWebSocket = (id: string) => {
    const api = useAPI()
    const queue = useQueue()
    const history = useHistory()
    const [subscribers, setSubscribers] = useState<number>(1)

    useEffect(() => {
        api.doValidateRoomID(id).then(isValid => {
            if (isValid) api.doGetQueue().then(queue.setTracks)
            else history.push('/not-found')
        })
        return () => api.doLeaveRoom()
    }, [api, history, id, queue.setTracks])

    useEffect(() => {
        const callbacks = {
            setSubscribers: (n: number) => setSubscribers(n),
            addTrackToQueue: queue.addedToQueue,
            removeTrackFromQueue: queue.removedFromQueue,
            vote: queue.voted,
        }
        api.doJoinRoom(id, callbacks)
    }, [queue.addedToQueue, queue.removedFromQueue, api, id, queue.voted])

    return { subscribers, queue }
}

const useVotes = () => {
    const [votes, setVotes] = useState<string[]>([])
    useEffect(() => {
        setVotes(getVotes())
    }, [])

    const handleSetVote = (id: string, vote: boolean) => {
        if (vote) setVotes([...votes, id])
        else setVotes(votes.filter(v => v !== id))
        setVoteInStorage(id, vote)
    }

    return { votes, setVotes: handleSetVote }
}

export const useQueue = () => {
    const [tracks, setTracks] = useState<TrackType[]>([])
    const { votes, setVotes } = useVotes()
    const api = useAPI()

    const handleAddTrackToQueue = (track: TrackType) => {
        api.doAddTrackToQueue(track.id).then(id => {
            track.queue_id = id
            setTracks([...tracks, track])
            setVotes(id, true)
        })
    }

    const handleTrackAddedToQueue = (track: TrackType) => {
        setTracks([...tracks, track])
    }

    const handleRemoveTrackFromQueue = (id: string) => {
        api.doRemoveTrackFromQueue(id)
        setTracks(tracks.filter(t => t.queue_id !== id))
        setVotes(id, false)
    }

    const handleTrackRemovedFromQueue = (id: string) => {
        console.log('Removing from queue:', id)
        setTracks(tracks.filter(t => t.queue_id !== id))
    }

    const handleVoteForTrack = (id: string, vote: boolean = true) => {
        api.doVoteForTrack(id, vote)
        const copy = [...tracks]
        const index = copy.findIndex(t => t.queue_id === id)
        copy[index].votes = copy[index].votes + (vote ? 1 : -1)
        setTracks(copy)
        setVotes(id, vote)
    }

    const handleReceivedVoteForTrack = (vote: { id: string; votes: number }) => {
        const { id, votes } = vote
        const copy = [...tracks]
        const index = copy.findIndex(t => t.queue_id === id)
        copy[index].votes = votes
        setTracks(copy)
    }

    return {
        // Probably anti-pattern to sort here, right?
        // The queue can be sorted from firebase,
        // but needs to be re-sorted on each vote
        tracks: tracks ? tracks.sort((a, b) => b.votes - a.votes) : [],
        addToQueue: handleAddTrackToQueue,
        addedToQueue: handleTrackAddedToQueue,
        removeFromQueue: handleRemoveTrackFromQueue,
        removedFromQueue: handleTrackRemovedFromQueue,
        vote: handleVoteForTrack,
        voted: handleReceivedVoteForTrack,
        votes,
        setTracks,
    }
}

export const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef(() => {})

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}
