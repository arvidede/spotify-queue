import React, { useEffect, useState } from 'react'
import { useInterval } from '../../utils/hooks'
import { millisToMinutesAndSeconds } from '../../utils/helpers'

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
