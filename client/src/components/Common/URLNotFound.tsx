import React from 'react'
import { Header } from '../Common/'
import './styles/URLNotFound.scss'

interface Props {}

export const URLNotFound: React.FC<Props> = () => {
    return (
        <div className="404">
            <Header color="green" size="s" />
            <h3>404</h3>
        </div>
    )
}
