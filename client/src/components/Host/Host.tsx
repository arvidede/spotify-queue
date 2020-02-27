import React, { useEffect, useState } from 'react'
import { Header } from '../Common/'
import { RouteComponentProps } from 'react-router'
import { useAPI } from '../../utils'
import './styles/Host.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Host: React.FC<Props> = (props: Props) => {
    const api = useAPI()
    const [subscribers, setSubscribers] = useState<number>(1)

    useEffect(() => {
        console.log('Fetch user data')
        api.onSubscribe = (n: number) => setSubscribers(n)
    }, [])

    return (
        <div className="host">
            <Header color="green" size="s" numSubscribers={subscribers} />
            <h3>Host</h3>
            <h5>{props.match.params.id}</h5>
        </div>
    )
}
