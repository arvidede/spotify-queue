import React from 'react'
import { Start, Redirect, Spectator, Host, Login, URLNotFound } from './components/'
import * as ROUTES from './utils/routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/App.scss'

/**
 * TODO:
 *  - Abort last search request on cancel
 *  - Get current queue
 *  - Add track to queue from search results
 *  - Vote for track
 *  - Host: Play current track
 *  - Host: Pause current track
 *  - Host: Skip to next track
 *  - Host: Skip to previous track
 *  - Host: Logout
 *  - Host: Remove session
 */

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
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
