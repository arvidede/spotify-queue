import React, { useEffect, useState } from 'react'

interface OverlayProps {
    fetching: boolean
}

export const Overlay: React.FC<OverlayProps> = ({ fetching }) => {
    const [showOverlay, setShowOverlay] = useState(fetching)

    useEffect(() => {
        setTimeout(() => setShowOverlay(false), 1000)
    }, [fetching])

    return showOverlay ? <div className={'player-loading-overlay' + (fetching ? '' : ' disabled')}></div> : null
}
