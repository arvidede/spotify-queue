import { useState, useEffect } from 'react'
import { useAsyncAbortable } from 'react-async-hook'
import { useAPI, TrackType } from './'

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
    const debouncedInput = useDebounce(input, 500)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (input === '' && e.target.value.length > 0) {
            onUpdate(e.target.value)
        } else if (e.target.value.length === 0) {
            onCancel()
        }
        setInput(e.target.value)
    }

    useEffect(() => {
        if (debouncedInput) {
            onUpdate(debouncedInput)
        }
    }, [debouncedInput])

    return { input, setInput, handleInputChange }
}

export const useSearch = () => {
    const [searchInput, setSearchInput] = useState('')
    const [searching, setSearching] = useState(false)
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
        const handleEscapePressed = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && searching) {
                setSearching(false)
            }
        }
        document.addEventListener('keydown', handleEscapePressed)
        return () => {
            document.removeEventListener('keydown', handleEscapePressed)
        }
    }, [searching])

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

    return { searching, cancelSearch: handleCancelSearch, searchUpdate: handleSearchUpdate, search }
}

export const useSubscribers = (id: string) => {
    const api = useAPI()
    const [subscribers, setSubscribers] = useState<number>(1)

    useEffect(() => {
        api.doJoinRoom(id)
        api.onSubscribe = (n: number) => setSubscribers(n)
        return () => {
            api.doLeaveRoom()
        }
    }, [])

    return subscribers
}

export const useQueue = () => {
    const [tracks, setTracks] = useState<TrackType[]>([])
    const api = useAPI()

    useEffect(() => {
        api.doGetQueue().then(setTracks)
    }, [api])

    const handleAddTrackToQueue = (track: TrackType) => {
        api.doAddTrackToQueue(track.id)
        // .then(id => {
        //     track.queue_id = id
        //     setTracks([...tracks, track])
        // })
        setTracks([...tracks, track])
    }

    const handleRemoveFromQueue = (track: TrackType) => {
        // api.doRemoveTrackFromQueue(track)
        // setTracks(tracks.filter(t => t.queue_id !== track.queue_id))
        setTracks(tracks.filter(t => t.id !== track.id))
    }

    const handleVote = (id: string, like: boolean = true) => {
        // api.doVoteForTrack(id)
    }

    return {
        // Probably anti-pattern to sort here, right?
        // The queue can be sorted from firebase,
        // but needs to be re-sorted on each vote
        tracks: tracks.sort((a, b) => a.votes - b.votes),
        addToQueue: handleAddTrackToQueue,
        removeFromQueue: handleRemoveFromQueue,
        vote: handleVote,
    }
}
