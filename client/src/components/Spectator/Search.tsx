import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useAPI, TrackType, useDebounce } from '../../utils'
import './styles/Search.scss'

interface SearchProps {
    onSearch: (s: string) => void
    isSearching: boolean
    onCancel: () => void
}

export const Search: React.FC<SearchProps> = ({ onSearch, isSearching, onCancel }: SearchProps) => {
    const [input, setInput] = useState('')
    const inputRef = useRef<HTMLInputElement>(document.createElement('input'))
    const debouncedInput = useDebounce(input, 300)

    const handleCancel = () => {
        inputRef.current.blur()
        setInput('')
        onCancel()
    }

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (!inputRef.current.contains(e.target as Node)) {
            handleCancel()
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (input === '' && e.target.value.length > 0) {
            onSearch(input)
        } else if (e.target.value.length === 0) {
            onCancel()
        }
        setInput(e.target.value)
    }

    useEffect(() => {
        if (debouncedInput) {
            onSearch(input)
        }
    }, [debouncedInput])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [handleClickOutside])

    return (
        <div className="search">
            <input ref={inputRef} onChange={handleInputChange} value={input} type="text" placeholder="Sök" />
            <button onClick={handleCancel}>&#x2573;</button>
        </div>
    )
}

interface SearchResultProps {
    tracks: TrackType[]
}

export const SearchResults: React.FC<SearchResultProps> = ({ tracks }: SearchResultProps) => {
    return (
        <ul className="track-list">
            {tracks.map((track, index) => (
                <li key={track.title + Math.random()}></li>
            ))}
        </ul>
    )
}
