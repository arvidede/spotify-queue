import React, { useEffect } from 'react'
import { Header } from '../Common/'
import { RouteComponentProps } from 'react-router'
import { useAPI } from '../../utils'
import './styles/Spectator.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Spectator: React.FC<Props> = ({ match }: Props) => {
    const api = useAPI()

    useEffect(() => {
        api.doJoinRoom(match.params.id)
    }, [])

    return (
        <div className="spectator">
            <Header color="green" size="s" />
            <h3>Room {match.params.id}</h3>
        </div>
    )
}
