import { useState, useEffect } from 'react'
import { useAsyncAbortable } from 'react-async-hook'
import { useAPI } from './'

export const validateRoomId = (s: string): boolean => {
    return s.length > 0 && !s.includes(' ')
}

export const parsedFetch = (url: string, body?: any, method: string = 'GET', signal?: AbortSignal) =>
    fetch(url, {
        signal,
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    })
        .then(gatherResponse)
        .catch(console.log)

async function gatherResponse(response: any): Promise<any> {
    if (response.status !== 200) {
        throw new Error('Bad status = ' + response.status)
    }
    return await response.json()

    // const { headers } = response
    // const contentType = headers.get('content-type')
    // if (contentType.includes('application/json')) {
    //     return await response.json()
    // } else if (contentType.includes('application/text')) {
    //     return await response.json()
    // } else if (contentType.includes('text/html')) {
    //     return await response.json()
    // } else {
    //     return await response.json()
    // }
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

export const useDebouncedInput = (onUpdate: any, onCancel: any) => {
    const [input, setInput] = useState('')
    const debouncedInput = useDebounce(input, 300)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (input === '' && e.target.value.length > 0) {
            onUpdate(e.target.value)
        } else if (e.target.value.length === 0) {
            onCancel()
        }
        setInput(e.target.value)
    }

    useEffect(() => {
        if (debouncedInput) {
            onUpdate(debouncedInput)
        }
    }, [debouncedInput])

    return { input, setInput, handleInputChange }
}

export const useSearch = () => {
    const [searchInput, setSearchInput] = useState('')
    const [searching, setSearching] = useState(false)
    const api = useAPI()

    const search = useAsyncAbortable(
        async (abortSignal, text) => {
            if (text.length === 0) {
                return []
            } else {
                return api.doSearchTrack(text, abortSignal)
            }
        },
        [searchInput],
    )

    return { searching, setSearching, setSearchInput, search }
}