import React, { useState } from 'react'
import { Button } from './Button'
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

const Host: React.FC = () => {
    const [input, setInput] = useState<string | undefined>('')
    const [inputVisible, setInputVisible] = useState<boolean>(false)
    return (
        <>
            <Button onClick={() => setInputVisible(!inputVisible)} value="Host" type="transparent" />
            {inputVisible && <input
                type="text"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setInput(e.target.value)
                }}
            />}
        </>
    )
}

const Join: React.FC = () => {
    return <Button onClick={() => console.log('haj')} value="Join" type="green" />
}
