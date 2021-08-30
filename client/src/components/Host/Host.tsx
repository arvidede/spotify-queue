import React from 'react'
import { Header } from '../Common/'
import { RouteComponentProps } from 'react-router'
import { useWebSocket, useSpotify } from '../../utils'
import { Search } from '../Search'
import './styles/Host.scss'
import { Player, TrackList } from './'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Host: React.FC<Props> = (props: Props) => {
    const { subscribers, queue } = useWebSocket(props.match.params.id)
    const { playerState, controller, fetching } = useSpotify()

    return (
        <div className="host">
            <Header color="green" size="s" numSubscribers={subscribers} id={props.match.params.id} />
            <div className="host-content">
                <Player tracks={queue.tracks} playerState={playerState} controller={controller} fetching={fetching} />
                <Search queue={queue}>
                    <TrackList tracks={queue.tracks} onDelete={queue.removeFromQueue} onPlay={controller.playTrack} />
                </Search>
            </div>
        </div>
    )
}
