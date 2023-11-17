import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [table, setTable] = useState({})
    const [load, setLoad] = useState(true)

    useEffect(() => {
        if (!url) return
        async function fetchData() {
            const response = await fetch(url)
            const res = await response.json()

            setTable(res)
            setLoad(false)
        }
        setLoad(true)
        fetchData()

    }, [url])

    return { load, table }
}