import React, { useEffect, useState } from 'react'
import { SpotifyPlayer } from '../../utils/'
import { PopUp } from './PopUpMenu'
import { ControllButton } from './ControllButton'

interface ConnectButtonProps {
    controller: SpotifyPlayer
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({ controller }) => {
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
    }, [controller.getDevices, controller])

    return (
        <div className="player-controll-connect">
            {isVisible && <PopUp devices={devices} onClick={handleSelectDevice} />}
            <ControllButton onClick={handleTogglePopUp} type="connect" />
        </div>
    )
}
