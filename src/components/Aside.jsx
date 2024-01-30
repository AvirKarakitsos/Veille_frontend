import styles from "../assets/styles/aside.module.css"
import Card from "./Card"
import { useFetch } from "../utils/useFetch"
import { useEffect, useRef, useState } from "react"
import { useViewport } from "../utils/useViewport"
import styled from "styled-components"


const IconeDown = styled.i`
    display: ${(props) => props.isDisplay? "block" : "none"};
`
const IconeRight = styled.i`
    display: ${(props) => props.isDisplay? "block" : "none"};
`
function Aside() {
    const { table: authors, load: isLoadingAuthors } = useFetch("http://localhost:4000/api/authors")
    const refContainer = useRef(null)
    const [isDisplay, setIsDisplay] = useState({iconeDown: true, iconeRight: false})
    const windowWidth = useViewport()
    
    useEffect(()=> {
        if(windowWidth > 768) {
            setIsDisplay((values) => ({...values, iconeDown: true, iconeRight: false}))
        } else setIsDisplay((values) => ({...values, iconeDown: false, iconeRight: true}))
        
        refContainer.current.addEventListener("scroll",()=>{
            if(windowWidth > 768) {
                if(refContainer.current.scrollTop + refContainer.current.offsetHeight >= refContainer.current.scrollHeight) {
                    setIsDisplay((values) => ({...values, iconeDown: false, iconeRight: false}))
                } else setIsDisplay((values) => ({...values, iconeDown: true, iconeRight: false}))
            } else {
                if(refContainer.current.scrollLeft + refContainer.current.offsetWidth >= refContainer.current.scrollWidth) {
                    setIsDisplay((values) => ({...values, iconeRight: false, iconeDown:false}))
                } else setIsDisplay((values) => ({...values, iconeRight: true, iconeDown:false}))
            }
           
        })
    },[windowWidth])

    return(
        <aside  className='container--left'>
            <div ref={refContainer} className={styles.scrollContainer}>
                {!isLoadingAuthors 
                    && authors.map((author) => <Card key={author._id} author={author}/>) 
                }
                
                <div  className={styles.icone}>
                    <IconeDown className="fa-solid fa-circle-arrow-down" isDisplay={isDisplay.iconeDown}></IconeDown>    
                    <IconeRight className="fa-solid fa-circle-arrow-right" isDisplay={isDisplay.iconeRight}></IconeRight> 
                </div>
            </div>
        </aside>
    )
}

export default Aside