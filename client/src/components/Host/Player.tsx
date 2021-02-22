import React, { useState, useEffect } from 'react'
import { TrackType, millisToMinutesAndSeconds, useInterval } from '../../utils'
import { Play, Pause, Connect, Shuffle, Next, Previous, Computer, Speaker, Phone } from '../Common'
import { PulseLoader as Spinner } from 'react-spinners'
import { Image } from './'
import './styles/Player.scss'
import { SpotifyPlayer } from '../../utils/Spotify'

const PLACEHOLDER_TRACK = {
    src: require('../../assets/img/placeholder.png'),
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
        if (playerState && 'is_playing' in playerState && playerState.item) {
            const track = playerState.item
            return (
                <div className="player">
                    <Image src={track.album.images[0].url} />
                    <h3>{track.artists[0].name}</h3>
                    <p>{track.name}</p>
                    <Controller tracks={tracks} state={playerState} controller={controller} />
                </div>
            )
        }
        return (
            <div className="player">
                <Image src={PLACEHOLDER_TRACK.src} />
                <h3>{PLACEHOLDER_TRACK.artist}</h3>
                <p>{PLACEHOLDER_TRACK.track}</p>
                <DisabledController controller={controller} />
            </div>
        )
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

    return showOverlay ? <div className={'player-loading-overlay' + (fetching ? '' : ' disabled')}></div> : null
}

interface DisabledControllerProps {
    controller: SpotifyPlayer
}

const DisabledController: React.FC<DisabledControllerProps> = ({ controller }) => {
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

interface PopUpProps {
    devices: SpotifyApi.UserDevice[]
    onClick: (id: string) => void
}

const PopUp: React.FC<PopUpProps> = ({ devices, onClick }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'Computer':
                return <Computer />
            case 'Speaker':
                return <Speaker />
            case 'Smartphone':
                return <Phone />
            default:
                return <Speaker />
        }
    }

    return (
        <div>
            <ul>
                {devices.length > 0 ? (
                    devices.map((device, index) => (
                        <li key={device.id}>
                            <button
                                className={
                                    device.is_restricted ? 'device-restricted' : device.is_active ? 'device-active' : ''
                                }
                                disabled={device.is_restricted}
                                onClick={() => onClick(device.id)}
                            >
                                {getIcon(device.type)}
                                <p>{device.name}</p>
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="loading">
                        <Spinner size={10} color={'white'} />
                    </li>
                )}
            </ul>
        </div>
    )
}

interface ConnectButtonProps {
    controller: SpotifyPlayer
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ controller }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [devices, setDevices] = useState([])

    const handleTogglePopUp = () => {
        if (!isVisible) controller.getDevices().then(setDevices)
        setIsVisible(!isVisible)
    }

    const handleSelectDevice = (id: string) => {
        controller
            .setDevice(id)
            .then(controller.getDevices)
            .then(setDevices)
    }

    useEffect(() => {
        let mounted = true
        controller.getDevices().then(devices => {
            if (mounted) setDevices(devices)
        })
        return () => (mounted = false)
    }, [controller.getDevices])

    return (
        <div className="player-controll-connect">
            {isVisible && <PopUp devices={devices} onClick={handleSelectDevice} />}
            <ControllButton onClick={handleTogglePopUp} type="connect" />
        </div>
    )
}

interface ControllButtonProps {
    type: 'shuffle' | 'prev' | 'play' | 'pause' | 'next' | 'connect'
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

interface ProgressBarProps {
    current: number
    length: number
    isPlaying: boolean
    onSeek: (ms: number) => void
    onEnd: () => void
}

const OFFSET = 1000

export const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    length,
    isPlaying,
    onSeek,
    onEnd,
}: ProgressBarProps) => {
    const [progress, setProgress] = useState(current)

    const styles = {
        // transform: `scaleX(${progress / length})`,
        width: `${(100 * progress) / length}%`,
    }

    useInterval(() => {
        if (isPlaying) {
            const next = progress + 1000 + OFFSET
            if (next < length) setProgress(next - OFFSET)
            else {
                setProgress(0)
                onEnd()
            }
        }
    }, 1000)

    useEffect(() => {
        if (progress > 0 && isPlaying) {
            setProgress(current)
        }
    }, [current, length])

    useEffect(() => {
        setProgress(progress)
    }, [isPlaying])

    const handleSeekTrack = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const progressBar = e.currentTarget
        const progressBarWidth = progressBar.offsetWidth
        const progressBarClickPosition = e.clientX - progressBar.getBoundingClientRect().left
        const progressBarProgressClicked = progressBarClickPosition / progressBarWidth
        const progressInMs = Math.round(progressBarProgressClicked * length)
        onSeek(progressInMs)
        setProgress(progressInMs)
    }

    return (
        <div className="progress-bar-container">
            <div>{millisToMinutesAndSeconds(progress)}</div>
            <div className="progress-bar" onClick={handleSeekTrack}>
                <div style={styles}></div>
            </div>
            <div>{millisToMinutesAndSeconds(length)}</div>
        </div>
    )
}
