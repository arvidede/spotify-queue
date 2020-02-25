import React from 'react'
import './styles/Header.scss'

interface Props {
    size: 'xs' | 's' | 'm' | 'l' | 'xl'
    color: 'white' | 'green'
}

export const Header: React.FC<Props> = ({ size, color }: Props) => {
    return (
        <div className={'header ' + color + ' ' + size}>
            <h3>Queue</h3>
        </div>
    )
}
