import React, { useState } from 'react'
import { TrackType } from '../../utils'
import { Play, Pause, Repeat, Shuffle, Next, Image } from './'
import './styles/Player.scss'
import { Previous } from './Icons'

interface PlayerProps {
    track: TrackType
}

export const Player: React.FC<PlayerProps> = ({ track }: PlayerProps) => {
    return (
        <div className="host-content-inner">
            <div className="player">
                <Image src={track.artwork} />
                <h3>{track.artist}</h3>
                <p>{track.title}</p>
                <Controller />
            </div>
        </div>
    )
}

interface ControllerProps {}

export const Controller: React.FC<ControllerProps> = ({}: ControllerProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    return (
        <div className="player-controller">
            <div className="player-controller-controlls">
                <ControllButton onClick={() => setIsPlaying(!isPlaying)} type="shuffle" />
                <ControllButton onClick={() => setIsPlaying(!isPlaying)} type="prev" />
                <ControllButton onClick={() => setIsPlaying(!isPlaying)} type={isPlaying ? 'pause' : 'play'} />
                <ControllButton onClick={() => setIsPlaying(!isPlaying)} type="next" />
                <ControllButton onClick={() => setIsPlaying(!isPlaying)} type="repeat" />
            </div>
            <ProgressBar length={100} current={45} />
        </div>
    )
}

interface ControllButtonProps {
    type: 'shuffle' | 'prev' | 'play' | 'pause' | 'next' | 'repeat'
    onClick: () => void
}

export const ControllButton: React.FC<ControllButtonProps> = ({ type, onClick }: ControllButtonProps) => {
    const isCircled = type === 'play' || type === 'pause'
    const renderIcon = () => {
        switch (type) {
            case 'next':
                return <Next />
            case 'play':
                return <Play />
            case 'prev':
                return <Previous />
            case 'pause':
                return <Pause />
            case 'shuffle':
                return <Shuffle />
            case 'repeat':
                return <Repeat />
        }
    }
    return (
        <button onClick={onClick} className={'player-controll-button ' + type + (isCircled ? ' circle' : '')}>
            {renderIcon()}
        </button>
    )
}

interface ProgressBarProps {
    length: number
    current: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ length, current }: ProgressBarProps) => {
    const styles = {
        transform: `scaleX(${current / length})`,
    }

    return (
        <div className="progress-bar-container">
            <div>{current}</div>
            <div className="progress-bar">
                <div style={styles}></div>
            </div>
            <div>{length}</div>
        </div>
    )
}
