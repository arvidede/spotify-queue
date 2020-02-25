import React from 'react'
import '../styles/TextInput.scss'

interface Props {
    onChange: (s: string) => void
    value: string | undefined,
    placeholder?: string
    visible?: boolean
}

export const TextInput: React.FC<Props> = ({ onChange, value, visible=true, placeholder='' }: Props) => {
    return (
        <input
            className={visible ? 'text-input visible' : 'text-input'}
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                onChange(e.target.value)
            }}
            placeholder={placeholder}
        />
    )
}
