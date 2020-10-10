import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useDebouncedInput } from '../../utils'
import './styles/SearchInput.scss'

interface SearchProps {
    onCancel: () => void
    onSearchUpdate: (s: string) => void
    searching: boolean
}

export const SearchInput: React.FC<SearchProps> = ({ onCancel, onSearchUpdate, searching }) => {
    const inputRef = useRef<HTMLInputElement>(document.createElement('input'))
    const { input, setInput, handleInputChange } = useDebouncedInput(onSearchUpdate, onCancel)
    const [hasFocus, setFocus] = useState(false)

    const handleCancel = useCallback(() => {
        inputRef.current.blur()
        setInput('')
        onCancel()
    }, [onCancel, setInput])

    const handleKeyPressed = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleCancel()
            }
        },
        [handleCancel],
    )

    useEffect(() => {
        const current = inputRef.current
        current.addEventListener('keydown', handleKeyPressed)

        return () => {
            current.removeEventListener('keydown', handleKeyPressed)
        }
    }, [handleKeyPressed])

    useEffect(() => {
        if (!searching && input.length > 0) {
            setInput('')
        }
    })

    return (
        <div className="search-input">
            <input
                ref={inputRef}
                tabIndex={1}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={handleInputChange}
                value={input}
                type="text"
                placeholder="Sök"
            />
            {(searching || hasFocus) && <button onClick={handleCancel}>&#x2573;</button>}
        </div>
    )
}
