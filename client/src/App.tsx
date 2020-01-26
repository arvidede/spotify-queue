import React, { useState } from 'react'
import { Main, Start, Voter } from './components/'
import './styles/App.scss'

const App: React.FC = () => {
    const [view, setView] = useState<'start' | 'main' | 'voter'>('start')
    const renderView = (): JSX.Element => {
        switch (view) {
            case 'main':
                return <Main />
            case 'start':
                return <Start onSelect={() => setView('start')} />
            case 'voter':
                return <Voter />
        }
    }
    return <div className="App">{renderView()}</div>
}

export default App
