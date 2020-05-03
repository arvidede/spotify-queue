import React, { useState, useEffect } from 'react'
import { TrackType, millisToMinutesAndSeconds } from '../../utils'
import { Play, Pause, Repeat, Shuffle, Next, Image } from './'
import './styles/Player.scss'
import { Previous } from './Icons'
import { useSpotify, SpotifyPlayer } from './Spotify'

const PLACEHOLDER_TRACK = {
    src: require('./placeholder.png'),
    artist: 'Artist',
    track: 'Track',
}

interface PlayerProps {
    tracks: TrackType[]
    playerState: SpotifyApi.CurrentPlaybackResponse
    controller: SpotifyPlayer
    fetching: boolean
}

export const Player: React.FC<PlayerProps> = ({ tracks, playerState, controller, fetching }) => {
    const renderPlayer = () => {
        if (playerState && 'is_playing' in playerState) {
            const track = playerState.item
            return (
                <div className="host-content-inner">
                    <div className="player">
                        <Image src={track.album.images[0].url} />
                        <h3>{track.artists[0].name}</h3>
                        <p>{track.name}</p>
                        <Controller tracks={tracks} state={playerState} controller={controller} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="host-content-inner">
                    <div className="player">
                        <Image src={PLACEHOLDER_TRACK.src} />
                        <h3>{PLACEHOLDER_TRACK.artist}</h3>
                        <p>{PLACEHOLDER_TRACK.track}</p>
                        <DisabledController />
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <Overlay fetching={fetching} />
            {renderPlayer()}
        </>
    )
}

interface OverlayProps {
    fetching: boolean
}

const Overlay: React.FC<OverlayProps> = ({ fetching }) => {
    const [showOverlay, setShowOverlay] = useState(fetching)

    useEffect(() => {
        setTimeout(() => setShowOverlay(false), 1000)
    }, [fetching])

    return showOverlay ? (
        <div className={'player-loading-overlay' + (fetching ? '' : ' disabled')}></div>
    ) : null
}

const DisabledController: React.FC = () => {
    return (
        <div className="player-controller">
            <div className="player-controller-controlls">
                <ControllButton onClick={() => {}} type="shuffle" />
                <ControllButton onClick={() => {}} type="prev" />
                <ControllButton onClick={() => {}} type={'play'} />
                <ControllButton onClick={() => {}} type="next" />
                <ControllButton onClick={() => {}} type="repeat" />
            </div>
            <ProgressBar isPlaying={false} length={0} current={0} />
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
        controller.playTrack(tracks[0].queue_id, tracks[0].id)
    }

    return (
        <div className="player-controller">
            <div className="player-controller-controlls">
                <ControllButton onClick={() => console.log(controller)} type="shuffle" />
                <ControllButton onClick={() => controller.changeTrack(false)} type="prev" />
                <ControllButton
                    onClick={handleTogglePlayback}
                    type={isPlaying ? 'pause' : 'play'}
                />
                <ControllButton onClick={handlePlayNextTrack} type="next" />
                <ControllButton onClick={() => console.log(controller)} type="repeat" />
            </div>
            <ProgressBar
                isPlaying={isPlaying}
                length={state.item.duration_ms}
                current={state.progress_ms}
            />
        </div>
    )
}

interface ControllButtonProps {
    type: 'shuffle' | 'prev' | 'play' | 'pause' | 'next' | 'repeat'
    onClick: () => void
}

export const ControllButton: React.FC<ControllButtonProps> = ({
    type,
    onClick,
}: ControllButtonProps) => {
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
        <button
            onClick={onClick}
            className={'player-controll-button ' + type + (isCircled ? ' circle' : '')}
        >
            {renderIcon()}
        </button>
    )
}

interface ProgressBarProps {
    current: number
    length: number
    isPlaying: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    length,
    isPlaying,
}: ProgressBarProps) => {
    const [progress, setProgress] = useState(current)

    const styles = {
        transform: `scaleX(${progress / length})`,
    }

    const tick = () => setProgress(progress + 1000 < length ? progress + 1000 : length)

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(tick, 1000)
            return () => clearInterval(interval)
        }
    }, [tick])

    useEffect(() => {
        setProgress(current)
    }, [current, length])

    useEffect(() => {
        setProgress(progress)
    }, [isPlaying])

    return (
        <div className="progress-bar-container">
            <div>{millisToMinutesAndSeconds(progress)}</div>
            <div className="progress-bar">
                <div style={styles}></div>
            </div>
            <div>{millisToMinutesAndSeconds(length)}</div>
        </div>
    )
}
