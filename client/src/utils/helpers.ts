import { useState, useEffect } from 'react'

export const validateRoomId = (s: string): boolean => {
    return s.length > 0 && !s.includes(' ')
}

export const parsedFetch = (url: string, body: any = null, method: string = 'GET') =>
    fetch(url, {
        method,
        credentials: 'include',
        // headers: body ? { 'Content-Type': 'application/json' } : undefined,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    }).then(gatherResponse)

async function gatherResponse(response: any): Promise<any> {
    const { headers } = response
    const contentType = headers.get('content-type')
    if (contentType.includes('application/json')) {
        return await response.json()
    } else if (contentType.includes('application/text')) {
        return await response.json()
    } else if (contentType.includes('text/html')) {
        return await response.json()
    } else {
        return await response.json()
    }
}

export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value])

    return debouncedValue
}
