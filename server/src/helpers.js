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
