import React, { useEffect, useState } from 'react'
import { SpotifyPlayer, TrackType } from '../../utils/'
import { ControllButton } from './ControllButton'
import { ConnectButton } from './ConnectButton'
import { ProgressBar } from './ProgressBar'

interface DisabledControllerProps {
    controller: SpotifyPlayer
}

export const DisabledController: React.FC<DisabledControllerProps> = ({ controller }) => {
    return (
        <div className="player-controller">
            <div className="player-controller-controlls">
                <ControllButton onClick={() => {}} type="shuffle" />
                <ControllButton onClick={() => {}} type="prev" />
                <ControllButton onClick={() => {}} type={'play'} />
                <ControllButton onClick={() => {}} type="next" />
                <ConnectButton controller={controller} />
            </div>
            <ProgressBar isPlaying={false} length={0} current={0} onSeek={(ms: number) => {}} onEnd={() => {}} />
        </div>
    )
}

interface ControllerProps {
    state: SpotifyApi.CurrentPlaybackResponse
    controller: SpotifyPlayer
    tracks: TrackType[]
}

export const Controller: React.FC<ControllerProps> = ({ state, controller, tracks }) => {
    const [isPlaying, setIsPlaying] = useState(state.is_playing)

    useEffect(() => {
        setIsPlaying(state.is_playing)
    }, [state.is_playing])

    const handleTogglePlayback = () => {
        controller.togglePlayback(isPlaying)
        setIsPlaying(!isPlaying)
    }

    const handlePlayNextTrack = () => {
        if (tracks.length > 0) {
            controller.playTrack(tracks[0].id, tracks[0].queue_id)
        } else {
            controller.playSimilarTrack()
        }
    }

    return (
        <div className="player-controller">
            <div className="player-controller-controlls">
                <ControllButton onClick={() => console.log(controller)} type="shuffle" />
                <ControllButton onClick={() => controller.changeTrack(false)} type="prev" />
                <ControllButton onClick={handleTogglePlayback} type={isPlaying ? 'pause' : 'play'} />
                <ControllButton onClick={handlePlayNextTrack} type="next" />
                <ConnectButton controller={controller} />
            </div>
            <ProgressBar
                isPlaying={isPlaying}
                length={state.item.duration_ms}
                current={state.progress_ms}
                onSeek={controller.seekInPlayingTrack}
                onEnd={handlePlayNextTrack}
            />
        </div>
    )
}
