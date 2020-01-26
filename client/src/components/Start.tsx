import React from 'react'
import { Button } from './Button'
import '../styles/Start.scss'

interface Props {
    onSelect: () => void
}

export const Start: React.FC<Props> = ({ onSelect }: Props) => {
    return (
        <div className="start">
            <h3 className="xl green">Queue</h3>
            <div className="start-buttons">
                <Host />
                <Join />
            </div>
        </div>
    )
}

const Join: React.FC = () => {
    return <Button onClick={() => console.log('haj')} value="Join" type="white" />
}

const Host: React.FC = () => {
    return <Button onClick={() => console.log('haj')} value="Host" type="transparent" />
}
