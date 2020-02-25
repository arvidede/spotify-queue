import React from 'react'
import { Header } from '../Common/'
import { RouteComponentProps } from 'react-router'
import './styles/Spectator.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {

}

export const Spectator: React.FC<Props> = (props: Props) => {
    return (
        <div className="spectator">
            <Header color="green" size="s" />
            <h3>Room {props.match.params.id}</h3>
        </div>
    )
}
