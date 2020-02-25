import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '../Common/'
import { TextInput } from './'

type Props = {
    onSelect: (s: string) => void
}

export const Join: React.FC<Props> = ({ onSelect }: Props) => {
    const [input, setInput] = useState<string>('')
    const [inputVisible, setInputVisible] = useState<boolean>(false)
    const joinRef = useRef<HTMLDivElement>(document.createElement('div'))

    const handleSubmit = useCallback((): void => {
        if (inputVisible && input.length > 0) {
            onSelect(input)
        } else {
            setInputVisible(true)
        }
    }, [inputVisible, input, onSelect])

    const handleClickOutside = useCallback(
        (e: MouseEvent): void => {
            if (!joinRef.current.contains(e.target as Node) && inputVisible) {
                setInputVisible(false)
            }
        },
        [inputVisible],
    )

    const handleEnterPressed = useCallback(
        (e: KeyboardEvent): void => {
            if (e.key === 'Enter') {
                handleSubmit()
            }
        },
        [handleSubmit],
    )

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        document.addEventListener('keydown', handleEnterPressed)
        return () => {
            document.removeEventListener('click', handleClickOutside)
            document.removeEventListener('keydown', handleEnterPressed)
        }
    }, [joinRef, handleEnterPressed, handleClickOutside])

    return (
        <div ref={joinRef} className={'join-button' + (inputVisible ? ' show' : '')}>
            <Button onClick={handleSubmit} value={inputVisible ? '\uFF0B' : 'Join'} type="green" />
            <TextInput onChange={setInput} placeholder="Room code" value={input} visible={inputVisible} />
        </div>
    )
}
