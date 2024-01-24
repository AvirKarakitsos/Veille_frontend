import { useState, useEffect } from 'react'

export function useFetch(url) {
    
    const [table, setTable] = useState({})
    const [numberPage, setNumberPage] = useState(0)
    const [load, setLoad] = useState(true)
    
    useEffect(() => {
        const controller = new AbortController()
        //const abort = () => controller.abort()
        //const {signal} = controller.signal
        
        if (!url) return
        async function fetchData() {
            try {
                const response = await fetch(url, {signal:controller.signal})
                const res = await response.json()
                
                if((url === "http://localhost:4000/api/posts") || url.includes("posts?")) {
                    setTable(res.data)
                    setNumberPage(res.numberPages)
                } 
                else setTable(res)
                
                setLoad(false)
            } catch(err) {
                if (err.name === 'AbortError') {
                    console.log('AbortError: Fetch request aborted');
                }
            }
        }
        setLoad(true)
        fetchData()
        
    }, [url])

    return { load, table, numberPage }
}