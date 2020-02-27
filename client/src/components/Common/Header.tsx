import React from 'react'
import { PersonIcon } from './'
import './styles/Header.scss'

interface Props {
    size: 'xs' | 's' | 'm' | 'l' | 'xl'
    color: 'white' | 'green'
    numSubscribers?: number
}

export const Header: React.FC<Props> = ({ size, color, numSubscribers }: Props) => {
    return (
        <div className={'header ' + color + ' ' + size}>
            <h3>Queue</h3>
            {numSubscribers && <div className='header-person-icon'>{numSubscribers} <PersonIcon /></div>}
        </div>
    )
}
