import React, { useEffect, useState } from 'react'
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
    const [subscribers, setSubscribers] = useState<number>(1)

    useEffect(() => {
        api.doJoinRoom(match.params.id)
        api.onSubscribe = (n: number) => setSubscribers(n)
    })

    return (
        <div className="spectator">
            <Header color="green" size="s" numSubscribers={subscribers} />
            <h3>Room {match.params.id}</h3>
        </div>
    )
}
