import React from 'react'
import { Header } from '../Common/'
import { TrackList } from './'
import { Search } from '../Search'
import { RouteComponentProps } from 'react-router'
import { useWebSocket } from '../../utils'
import './styles/Spectator.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Spectator: React.FC<Props> = React.memo(({ match }) => {
    const { subscribers, queue } = useWebSocket(match.params.id)

    return (
        <div className="spectator">
            <Header color="green" size="s" numSubscribers={subscribers} />
            <Search queue={queue}>
                <TrackList onVote={queue.vote} votes={queue.votes} tracks={queue.tracks} />
            </Search>
        </div>
    )
})
