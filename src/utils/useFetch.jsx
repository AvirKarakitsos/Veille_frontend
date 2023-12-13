import { useState, useEffect } from 'react'

export function useFetch(url) {
    
    const [table, setTable] = useState({})
    const [load, setLoad] = useState(true)
    
    useEffect(() => {
        const controller = new AbortController()
       // const abort = () => controller.abort()
        //const {signal} = controller.signal
        
        if (!url) return
        async function fetchData() {
            const response = await fetch(url, {signal:controller.signal})
            const res = await response.json()

            setTable(res)
            setLoad(false)
        }
        setLoad(true)
        
        let time = setTimeout(() => {
            fetchData()
        },2000)

        return () => {
            clearTimeout(time)
            controller.abort()
        }

    }, [url])

    return { load, table }
}