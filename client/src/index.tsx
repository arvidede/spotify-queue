import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import { AuthContext, Auth, APIContext, API } from './utils/'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <APIContext.Provider value={new API()}>
        <AuthContext.Provider value={new Auth()}>
            <App />
        </AuthContext.Provider>
    </APIContext.Provider>,
    document.getElementById('root'),
)
serviceWorker.unregister()
