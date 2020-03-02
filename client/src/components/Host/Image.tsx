import React, { useRef, useEffect } from 'react'
import VanillaTilt from 'vanilla-tilt'
import './styles/Image.scss'

const OPTIONS = {
    perspective: 2000,
    speed: 500,
    max: 5,
}

export interface Props {
    src: string
}

export const Image: React.FC<Props> = ({ src }: Props) => {
    const tilt = useRef<HTMLDivElement>(document.createElement('div'))

    useEffect(() => {
        VanillaTilt.init(tilt.current, OPTIONS)
    })

    return (
        <div ref={tilt} className="album-tilt">
            <img src={src} alt="Album artwork" />
        </div>
    )
}
