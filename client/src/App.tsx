import React from 'react'
import { Start, Redirect, Spectator, Host, Login, URLNotFound } from './components/'
import * as ROUTES from './utils/routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/App.scss'

/**
 * TODO:

 *  - Host: Logout
 *  - Host: Remove session
 *  - Host: Fallback playlist/queue/track (Radio on last played track)
 *  - Host: Search and add tracks
 *  - Host: Fullscreen mode
 *  - Redirect to 404 when entering unknown id in url
 *  - Lazy-load additional search results
 *
 * FIX:
 *  - Abort last search request on cancel
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
