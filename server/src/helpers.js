import { TOKEN_BASE_64, TOKEN_URL } from './constants'
const axios = require('axios')
const querystring = require('querystring')

export const Response = res => {
    return JSON.stringify({ data: res })
}

export const fetchToken = async type => {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Basic ${TOKEN_BASE_64}`,
        },
        data: querystring.stringify(type),
        url: TOKEN_URL,
    }
    try {
        const response = await axios(options)
        return response.data
    } catch (error) {
        console.log('Error fetching token:', error)
    }
}

export const shortID = () => {
    return (
        String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase() +
        (Math.random() * 10).toString().substr(2, 5)
    )
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('')
}

export const extractTrackInformation = track => {
    return {
        title: track.name,
        artist: track.artists[0].name,
        album_s: track.album.images[0].url,
        album_m: track.album.images[1].url,
        album_l: track.album.images[2].url,
        length: track.duration_ms,
        id: track.id,
        votes: 0,
    }
}
