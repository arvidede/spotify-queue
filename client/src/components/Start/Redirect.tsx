import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useAPI } from '../../utils'

export interface RedirectProps extends RouteComponentProps {}

export const Redirect: React.FC<RedirectProps> = props => {
    const api = useAPI()

    useEffect(() => {
        const query = new URLSearchParams(props.location.search)
        const code = query.get('code')
        api.doFetchUserToken(code).then(() => {
            window.opener.tokenCallback()
            window.close()
        })
    }, [api, props.location])
    return <div></div>
}
