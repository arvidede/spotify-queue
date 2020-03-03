import React from 'react'
import { Dots } from './'
import './styles/Button.scss'

interface Props {
    onClick: () => void
    type?: 'green' | 'white' | 'transparent'
    value?: string
    loading?: boolean
}

export const Button: React.FC<Props> = ({ onClick, type = 'green', value = '', loading = false }: Props) => {
    return (
        <button onClick={onClick} className={'button button-' + type}>
            <div>{loading ? <Dots /> : value}</div>
        </button>
    )
}
