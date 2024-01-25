import styles from "../assets/styles/aside.module.css"
import Card from "./Card"
import { useFetch } from "../utils/useFetch"
import { useEffect, useRef } from "react"
import { useViewport } from "../utils/useViewport"


function Aside() {
    const { table: authors, load: isLoadingAuthors } = useFetch("http://localhost:4000/api/authors")
    const refContainer = useRef(null)
    const refIcone = useRef(null)
    const refIcone2 = useRef(null)
    const windowWidth = useViewport()
    
    useEffect(()=> {
        refContainer.current.addEventListener("scroll",()=>{
          
            if(windowWidth > 768) {
                if(refContainer.current.scrollTop + refContainer.current.offsetHeight >= refContainer.current.scrollHeight) {
                    refIcone.current?.classList.add("hidden")
                } else refIcone.current.classList.remove("hidden")
            } else {
                if(refContainer.current.scrollLeft + refContainer.current.offsetWidth >= refContainer.current.scrollWidth) {
                    refIcone2.current?.classList.add("hidden")
                } else refIcone2.current.classList.remove("hidden")
            }
           
        })
    },[windowWidth])

    return(
        <aside  className='container--left'>
            <div ref={refContainer} className={styles.scrollContainer}>
                {!isLoadingAuthors 
                    && authors.map((author) => <Card key={author._id} author={author}/>) 
                }
                {windowWidth > 768
                
                ? <div  className={styles.icone}>
                    <i ref={refIcone} className="fa-solid fa-circle-arrow-down"></i>    
                </div>
                : <div  className={styles.icone}>
                        <i ref={refIcone2} className="fa-solid fa-circle-arrow-down"></i>    
                    </div>
                }
            </div>
        </aside>
    )
}

export default Aside