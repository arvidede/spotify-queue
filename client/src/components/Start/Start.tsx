import React from 'react'
import { Join, Host } from './'
import { useAuth, ROUTES, useAPI } from '../../utils'
import { RouteComponentProps } from 'react-router'
import './styles/Start.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {
    onSelect?: (s: string) => void
}

export const Start: React.FC<Props> = ({ onSelect, history }: Props) => {
    const api = useAPI()
    const auth = useAuth()

    const handleHostRoom = async (): Promise<any> => {
        // Emit setup request to server & fetch room id
        console.log('Authorizing...')
        api.doAuthorizeUser().then(async () => {
            console.log('Authorized!')
            const id = await api.doSetupRoom()
            history.push(ROUTES.HOST.replace(':id', id))
        })
    }

    const handleJoinRoom = async (id: string): Promise<any> => {
        if (await api.doValidateRoomID(id)) {
            history.push(ROUTES.ROOM.replace(':id', id))
        }
    }

    return (
        <div className="start">
            <h3 className="xl green">Queue</h3>
            <div className="start-buttons">
                <Host onSelect={handleHostRoom} />
                <Join onSelect={handleJoinRoom} />
            </div>
        </div>
    )
}
