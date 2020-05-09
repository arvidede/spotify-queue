import React from 'react'
import { Start, Redirect, Spectator, Host, Login, URLNotFound } from './components/'
import * as ROUTES from './utils/routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/App.scss'

/**
 * TODO:
 *  - Host/Spectator: Lazy-load additional search results
 *  - Host: Fullscreen mode
 *  - Host: Logout / Remove session
 *  - Host: Sync with lyrics from external API
 
 *
 * FIX:
 *  - Abort last search request on cancel
 *  - Strange behaviour when the callback is empty
 *  - Host: Close device list when clicking outside
 */

const App: React.FC = () => {
    return (
        <div className="App">
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path={ROUTES.START} exact component={Start} />
                    <Route path={ROUTES.LOGIN} exact component={Login} />
                    <Route path={ROUTES.ROOM} exact component={Spectator} />
                    <Route path={ROUTES.HOST} exact component={Host} />
                    <Route path={ROUTES.REDIRECT} exact component={Redirect} />
                    <Route>
                        <URLNotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
