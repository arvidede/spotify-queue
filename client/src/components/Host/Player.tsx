import React from 'react'
import { Image } from './'
import { TrackType } from '../../utils'
import './styles/Player.scss'

interface PlayerProps {
    track: TrackType
}

export const Player: React.FC<PlayerProps> = ({ track }: PlayerProps) => {
    return (
        <div className="host-content-inner">
            <div className="player">
                <Image src={track.artwork} />
                <Controller />
            </div>
        </div>
    )
}

interface ControllerProps {}

export const Controller: React.FC<ControllerProps> = ({}: ControllerProps) => {
    return (
        <div className="player-controller">
            <div className="player-controller-controlls">
                <ControllButton type="shuffle" />
                <ControllButton type="prev" />
                <ControllButton type="play" />
                <ControllButton type="next" />
                <ControllButton type="repeat" />
            </div>
            <ProgressBar />
        </div>
    )
}

interface ControllButtonProps {
    type: 'shuffle' | 'prev' | 'play' | 'next' | 'repeat'
}

export const ControllButton: React.FC<ControllButtonProps> = ({ type }: ControllButtonProps) => {
    return <button className="player-controll-button">{type}</button>
}

interface ProgressBarProps {}

export const ProgressBar: React.FC<ProgressBarProps> = ({}: ProgressBarProps) => {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar"></div>
        </div>
    )
}
