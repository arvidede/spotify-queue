import React, { useEffect, useCallback, useState, useRef } from 'react'
import { TrackType, useDebouncedInput } from '../../utils'
import { SearchResults } from './'
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

    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (!inputRef.current.contains(e.target as Node)) {
                handleCancel()
            }
        },
        [handleCancel],
    )

    const handleKeyPressed = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleCancel()
            }
        },
        [handleCancel],
    )

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
