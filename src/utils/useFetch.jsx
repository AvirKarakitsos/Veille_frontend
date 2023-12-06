import { useState, useEffect } from 'react'

export function useFetch(url) {
    
    const [table, setTable] = useState({})
    const [load, setLoad] = useState(true)
    
    useEffect(() => {
        const abortController = new AbortController()
        const abort = () => abortController.abort()
        const {signal} = abortController.signal
        
        if (!url) return
        async function fetchData() {
            const response = await fetch(url, {signal})
            const res = await response.json()

            setTable(res)
            setLoad(false)
        }
        setLoad(true)
        
        setTimeout(() => {
            fetchData()
        },2000)

        return () => {
            abort()    
        }

    }, [url])

    return { load, table }
}