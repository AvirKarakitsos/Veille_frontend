import styles from "../assets/styles/aside.module.css"
import Card from "./Card"
import { useFetch } from "../utils/useFetch"
import { useEffect, useRef } from "react"


function Aside() {
    const { table: authors, load: isLoadingAuthors } = useFetch("http://localhost:4000/api/authors")
    const refContainer = useRef(null)
    const refIcone = useRef(null)

    useEffect(()=> {
        refContainer.current.addEventListener("scroll",()=>{
            if(refContainer.current.scrollTop + refContainer.current.offsetHeight >= refContainer.current.scrollHeight) {
                refIcone.current.classList.add("hidden")
            } else refIcone.current.classList.remove("hidden")
        })
    },[])

    return(
        <aside  className='container--left'>
            <div ref={refContainer} className={styles.scrollContainer}>
                {!isLoadingAuthors 
                    && authors.map((author) => <Card key={author._id} author={author}/>) 
                }
            <div  className={styles.icone}>
                <i ref={refIcone} className="fa-solid fa-circle-arrow-down"></i>    
            </div>
            </div>
        </aside>
    )
}

export default Aside