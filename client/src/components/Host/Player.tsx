import React from 'react'
import { TrackType, SpotifyPlayer } from '../../utils'
import { Image } from './Image'
import './styles/Player.scss'
import { Overlay } from './Overlay'
import { DisabledController, Controller } from './Controller'

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
    const playerIsActive = playerState && 'is_playing' in playerState && playerState.item
    const track = playerState?.item

    return (
        <>
            <Overlay fetching={fetching} />
            <div className="player">
                {playerIsActive ? (
                    <>
                        <Image src={track.album.images[0].url} />
                        <h3>{track.artists[0].name}</h3>
                        <p>{track.name}</p>
                        <Controller tracks={tracks} state={playerState} controller={controller} />
                    </>
                ) : (
                    <>
                        <Image src={PLACEHOLDER_TRACK.src} />
                        <h3>{PLACEHOLDER_TRACK.artist}</h3>
                        <p>{PLACEHOLDER_TRACK.track}</p>
                        <DisabledController controller={controller} />
                    </>
                )}
            </div>
        </>
    )
}
