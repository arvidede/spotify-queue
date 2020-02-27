import React from 'react'

type Props = {
    numSubscribers: number
}

export const Spectators: React.FC<Props> = ({ numSubscribers }: Props) => {
    return <div>{numSubscribers}</div>
}
