import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useAPI, TrackType } from '../../utils'
import './styles/Search.scss'

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}: SearchProps) => {
    const [input, setInput] = useState('')
    const inputRef = useRef<HTMLInputElement>(document.createElement('input'))

    const handleCancel = () => {
        inputRef.current.blur()
        setInput('')
    }

    const handleClickOutside = useCallback((e: MouseEvent) => {
        console.log(e.target)
        if (!inputRef.current.contains(e.target as Node)) {
            handleCancel()
        }
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [handleClickOutside])

    return (
        <div className="search">
            <input
                ref={inputRef}
                onChange={e => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Sök"
            />
            <button onClick={handleCancel}>&#x2573;</button>
        </div>
    )
}

interface SearchResultProps {
    tracks: TrackType[]
}

export const SearchResults: React.FC<SearchResultProps> = ({ tracks }: SearchResultProps) => {
    return (
        <div>
            <ul>
                {tracks.map((track, index) => (
                    <li key={track.title + Math.random()}></li>
                ))}
            </ul>
        </div>
    )
}
