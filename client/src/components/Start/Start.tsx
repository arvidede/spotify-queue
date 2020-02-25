import React from 'react'
import { Join, Host } from './'
import { RouteComponentProps } from 'react-router'
import * as ROUTES from '../../utils/routes'
import { isValidRoomId } from '../../utils/helpers'
import './styles/Start.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {
    onSelect?: (s: string) => void
}

export const Start: React.FC<Props> = ({ onSelect, ...props }: Props) => {
    const handleJoinRoom = (id: string): void => {
        if (isValidRoomId(id)) {
            props.history.push(ROUTES.ROOM.replace(':id', String(id)))
        }
    }

    return (
        <div className="start">
            <h3 className="xl green">Queue</h3>
            <div className="start-buttons">
                <Host />
                <Join onSelect={handleJoinRoom} />
            </div>
        </div>
    )
}
