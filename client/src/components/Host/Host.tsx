import React, { useState } from 'react'
import { Header } from '../Common/'
import { RouteComponentProps } from 'react-router'
import { TrackType, useWebSocket } from '../../utils'
import './styles/Host.scss'
import { Player, TrackList } from './'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Host: React.FC<Props> = (props: Props) => {
    const [track, setTrack] = useState<number>(0)
    const { subscribers, queue } = useWebSocket(props.match.params.id)

    return (
        <div className="host">
            <Header color="green" size="s" numSubscribers={subscribers} id={props.match.params.id} />
            <div className="host-content">
                {/* <Player track={queue.tracks[track]} /> */}
                <TrackList
                    tracks={queue.tracks}
                    onDelete={queue.removeFromQueue}
                    onPlay={(id: string) => console.log(id)}
                />
            </div>
        </div>
    )
}
