import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useAPI, SPOTIFY_USER_TOKEN } from '../../utils'

export interface RedirectProps extends RouteComponentProps {}

export const Redirect: React.FC<RedirectProps> = props => {
    const api = useAPI()

    useEffect(() => {
        const query = new URLSearchParams(props.location.search)
        const code = query.get('code')
        api.doFetchUserToken(code).then(token => {
            token.expires_on = Date.now() + token.expires_in * 1000
            localStorage.setItem(SPOTIFY_USER_TOKEN, JSON.stringify(token))
            window.close()
        })
    })
    return <div></div>
}
