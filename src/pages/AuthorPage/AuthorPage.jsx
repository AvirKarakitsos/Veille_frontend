import Post from "../../components/Post"
import { useLocation, useParams } from "react-router-dom"
import { useFetch } from "../../utils/useFetch"
import styles from "./AuthorPage.module.css"
import Aside from "../../components/Aside"


function AuthorPage() {
    const location = useLocation()
    const param = useParams()
    const { table, load } = useFetch(`http://localhost:4000/api/authors/${location.state}/posts`)

    if(load) {
        return <div className="loading-page">... Loading</div>
    }

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
}

export default AuthorPage