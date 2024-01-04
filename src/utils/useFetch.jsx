import { useState, useEffect } from 'react'

export function useFetch(url) {
    
    const [table, setTable] = useState({})
    const [numberPage, setNumberPage] = useState(0)
    const [load, setLoad] = useState(true)
    
    useEffect(() => {
        const controller = new AbortController()
       // const abort = () => controller.abort()
        //const {signal} = controller.signal
        
        if (!url) return
        async function fetchData() {
            const response = await fetch(url, {signal:controller.signal})
            const res = await response.json()
            console.log(res)
            if(url.includes("posts")) {
                setTable(res[0])
                setNumberPage(res[1])
            } 
            else setTable(res)
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

    return { load, table, numberPage }
}