import styles from "./AuthorPage.module.css"
import Post from "../../components/Post"
import Aside from "../../components/Aside"
import { useLocation, useParams } from "react-router-dom"
import { useFetch } from "../../utils/useFetch"
import { validatePathName } from "../../utils/validatePath"


function AuthorPage() {
    const location = useLocation()
    const param = useParams()
    const { table: authors, load: loadAuthors } = useFetch(`http://localhost:4000/api/authors`)
    const { table, load } = useFetch(`http://localhost:4000/api/authors/${location.state}/posts`)
    
    if(load || loadAuthors) {
        return <div className="loading-page">... Loading</div>
    } else if(validatePathName(authors, param.name)) {
        return (
            <>
            <Aside/>
            <main className="container--right">
                <h2>{ param.name }</h2>
                <section className={styles["container--post"]}>
                    {table.map((post) => <Post key={post._id} post={post}/>)}
                </section>
            </main>
            </>
        )
    } else {
        return <div className="loading-page">404</div>
    }
} 

export default AuthorPage