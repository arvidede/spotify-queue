import React from 'react'
import { Next, Play, Previous, Pause, Shuffle, Connect } from '../Common/Icons'
interface ControllButtonProps {
    type: 'shuffle' | 'prev' | 'play' | 'pause' | 'next' | 'connect'
    onClick?: () => void
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
            case 'connect':
                return <Connect />
        }
    }
    return (
        <button onClick={onClick} className={'player-controll-button ' + type + (isCircled ? ' circle' : '')}>
            {renderIcon()}
        </button>
    )
}
