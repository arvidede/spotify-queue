import React, { useState } from 'react'
import { Button } from '../Common/'
import { useAuth, ROUTES, useAPI } from '../../utils'
import { useHistory } from 'react-router-dom'

type Props = {
    onSelect?: () => void
}

export const Host: React.FC<Props> = ({ onSelect }: Props) => {
    const [isLoading, setLoading] = useState(false)
    const history = useHistory()
    const auth = useAuth()
    const api = useAPI()

    const handleClick = async (): Promise<any> => {
        setLoading(true)
        // Emit setup request to server & fetch room id
        const id = await api.doSetupRoom()
        history.push(ROUTES.HOST.replace(':id', id))
    }

    return <Button onClick={handleClick} value="Host" type="transparent" loading={isLoading} />
}
