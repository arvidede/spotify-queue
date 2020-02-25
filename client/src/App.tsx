import React from 'react'
import { Start, Spectator, Host, Login, URLNotFound } from './components/'
import * as ROUTES from './utils/routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/App.scss'

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={ROUTES.START} exact component={Start} />
                    <Route path={ROUTES.LOGIN} exact component={Login} />
                    <Route path={ROUTES.ROOM} exact component={Spectator} />
                    <Route path={ROUTES.HOST} exact component={Host} />
                    <Route>
                        <URLNotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
