import React from 'react'
import '../styles/Button.scss'

interface Props {
    onClick: () => void
    type?: 'green' | 'white' | 'transparent'
    value?: string
}

export const Button: React.FC<Props> = ({ onClick, type = 'green', value = '' }: Props) => {
    return <button onClick={onClick} className={'button button-' + type}>{value}</button>
}
