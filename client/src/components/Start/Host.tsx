import React, { useState } from 'react'
import { Button } from '../Common/'

type Props = {
    onSelect: () => void
}

export const Host: React.FC<Props> = ({ onSelect }: Props) => {
    const [isLoading, setLoading] = useState(false)

    const handleClick = () => {
        setLoading(true)
        onSelect()
    }

    return <Button onClick={handleClick} value="Host" type="transparent" loading={isLoading} />
}
