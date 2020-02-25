import React, { useState, useRef, useEffect } from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import '../styles/Start.scss'

interface Props {
    onSelect: () => void
}

export const Start: React.FC<Props> = ({ onSelect }: Props) => {
    return (
        <div className="start">
            <h3 className="xl green">Queue</h3>
            <div className="start-buttons">
                <Host />
                <Join />
            </div>
        </div>
    )
}

const Join: React.FC = () => {
    const [input, setInput] = useState<string | undefined>('')
    const [inputVisible, setInputVisible] = useState<boolean>(false)
    const joinRef = useRef<HTMLDivElement>(document.createElement('div'))

    const handleClickOutside = (e: MouseEvent): void => {
        if (!joinRef.current.contains(e.target as Node) && inputVisible) {
            setInputVisible(false)
        }
    }

    const handleEnterPressed = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleSubmit = (): void => {
        if (inputVisible) {
            // Join room
        } else {
            setInputVisible(true)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        document.addEventListener('keydown', handleEnterPressed)
        return () => {
            document.removeEventListener('click', handleClickOutside)
            document.removeEventListener('keydown', handleEnterPressed)
        }
    }, [joinRef, inputVisible])

    return (
        <div ref={joinRef} className={'join-button' + (inputVisible ? ' show' : '')}>
            <Button onClick={handleSubmit} value={inputVisible ? '\uFF0B' : 'Join'} type="green" />
            <TextInput onChange={setInput} placeholder='Room code' value={input} visible={inputVisible} />
        </div>
    )
}

const Host: React.FC = () => {
    return <Button onClick={() => console.log('haj')} value="Host" type="transparent" />
}
