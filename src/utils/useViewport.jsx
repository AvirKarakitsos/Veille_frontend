import { useEffect, useState } from "react"

export function useViewport() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleWidth() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleWidth)

        return() => {
            window.removeEventListener("resize", handleWidth)
        }
    },[])

    return windowWidth
}