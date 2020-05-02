import React, { useContext } from 'react'

export interface AuthType {
    auth: boolean
    roomId: string
    doLogin: () => void
    doSignOut: () => void
}

export class Auth implements AuthType {
    auth: boolean
    roomId: string

    constructor() {
        this.auth = false
        this.roomId = ''
    }

    doLogin = () => {}

    doSignOut = () => {}
}

export const AuthContext = React.createContext<AuthType>(new Auth())

export const useAuth = () => useContext(AuthContext)

export default AuthContext
