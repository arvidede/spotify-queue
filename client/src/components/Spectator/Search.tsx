import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useAPI, TrackType, useDebouncedInput } from '../../utils'
import './styles/Search.scss'

interface SearchProps {
    onCancel: () => void
    onSearchUpdate: (s: string) => void
}

export const Search: React.FC<SearchProps> = ({ onCancel, onSearchUpdate }) => {
    const inputRef = useRef<HTMLInputElement>(document.createElement('input'))
    const { input, setInput, handleInputChange } = useDebouncedInput(onSearchUpdate, onCancel)
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

    const handleKeyPressed = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleCancel()
        }
    }, [])

    useEffect(() => {
        inputRef.current.addEventListener('click', handleClickOutside)
        inputRef.current.addEventListener('keydown', handleKeyPressed)

        return () => {
            inputRef.current.removeEventListener('click', handleClickOutside)
            inputRef.current.removeEventListener('keydown', handleKeyPressed)
        }
    }, [handleClickOutside, handleKeyPressed])

    return (
        <div className="search">
            <input ref={inputRef} onChange={handleInputChange} value={input} type="text" placeholder="Sök" />
            <button onClick={handleCancel}>&#x2573;</button>
        </div>
    )
}

interface SearchResultProps {
    tracks: TrackType[]
    onAddTrack: (track: string) => void
}

const img = require('../../assets/img/album.jpg')

export const SearchResults: React.FC<SearchResultProps> = ({ tracks, onAddTrack }: SearchResultProps) => {
    return (
        <ul className="track-list">
            {tracks.map((track, index) => (
                <li key={track.title + Math.random()}>
                    <img src={img /*track.artwor*/} alt="" />
                    <div className="track-names">
                        <div>
                            <h3>{track.title + ' ' + Math.ceil(Math.random() * 10)}</h3>
                        </div>
                        <div>{track.artist}</div>
                    </div>
                    <button onClick={() => onAddTrack(track.title)}>&#65291;</button>
                </li>
            ))}
        </ul>
    )
}
