import React, { useState, useEffect } from 'react'
import { Join, Host } from './'
import { ROUTES, useAPI } from '../../utils'
import { RouteComponentProps } from 'react-router'
import './styles/Start.scss'

const ERROR_SESSION = 'The session could not be found'
const ERROR_AUTH = 'User could not be authenticated'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {
    onSelect?: (s: string) => void
}

export const Start: React.FC<Props> = ({ onSelect, history }: Props) => {
    const api = useAPI()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Wake up idle Heroku dyno
        api.ping()
    }, [api])

    const handleHostRoom = async (): Promise<any> => {
        console.log('Authorizing...')
        api.doAuthorizeUser()
            .then(async () => {
                console.log('Authorized!')
                const id = await api.doSetupRoom()
                history.push(ROUTES.HOST.replace(':id', id))
            })
            .catch(err => {
                setError(ERROR_AUTH)
            })
    }

    const handleJoinRoom = async (id: string): Promise<any> => {
        setLoading(true)
        if (await api.doValidateRoomID(id)) {
            history.push(ROUTES.ROOM.replace(':id', id))
        } else {
            setLoading(false)
            setError(ERROR_SESSION)
        }
    }

    return (
        <div className="start">
            <h3 className="xl green">Queue</h3>
            <div className="start-buttons">
                <Host onSelect={handleHostRoom} />
                <Join onSelect={handleJoinRoom} loading={loading} />
            </div>
            {error && <div className="start-error">{error}</div>}
        </div>
    )
}
