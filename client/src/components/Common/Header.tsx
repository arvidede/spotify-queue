import React from 'react'
import { PersonIcon } from './'
import { useHistory } from 'react-router-dom'
import './styles/Header.scss'

interface Props {
    size: 'xs' | 's' | 'm' | 'l' | 'xl'
    color: 'white' | 'green'
    numSubscribers?: number
    id?: string
}

export const Header: React.FC<Props> = ({ size, color, numSubscribers, id }: Props) => {
    const history = useHistory()
    return (
        <div className={'header ' + color + ' ' + size}>
            <h3 className="header-name" onClick={history.goBack}>
                Queue
            </h3>
            {id && (
                <h3 className="header-code">
                    Go to <b>q.edenheim.se</b> and use the code <b>{id}</b>{' '}
                </h3>
            )}
            {numSubscribers && (
                <div className="header-person-icon">
                    {numSubscribers} <PersonIcon />
                </div>
            )}
        </div>
    )
}
