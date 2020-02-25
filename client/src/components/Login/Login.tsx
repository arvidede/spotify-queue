import React from 'react'
import { Header } from '../Common/'
import './styles/Login.scss'

interface Props {}

export const Login: React.FC<Props> = () => {
    return (
        <div className="login">
            <Header color="green" size="s" />
            <h3>Login</h3>
        </div>
    )
}
