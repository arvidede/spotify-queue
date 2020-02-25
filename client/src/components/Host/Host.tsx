import React, { useEffect } from 'react'
import { Header } from '../Common/'
import { RouteComponentProps } from 'react-router'
import './styles/Host.scss'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export const Host: React.FC<Props> = (props: Props) => {

    useEffect(() => {
        console.log('Fetch user data')
    }, [])

    return (
        <div className="host">
            <Header color="green" size="s" />
            <h3>Host</h3>
            <h5>{props.match.params.id}</h5>
        </div>
    )
}
