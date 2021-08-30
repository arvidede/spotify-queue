import React from 'react'
import { PulseLoader as Spinner } from 'react-spinners'
import { Computer, Speaker, Phone } from '../Common/Icons'
interface PopUpProps {
    devices: SpotifyApi.UserDevice[]
    onClick: (id: string) => void
}

export const PopUp: React.FC<PopUpProps> = ({ devices, onClick }) => {
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
