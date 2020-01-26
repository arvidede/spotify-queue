import React from 'react'
import { Header } from './Header'
import '../styles/Main.scss'

interface Props {}

export const Main: React.FC<Props> = () => {
    return (
        <div className="main">
            <Header color="green" size="s" />
            <h3>Main</h3>
        </div>
    )
}
