import Post from "../../components/Post"
import { useLocation, useParams } from "react-router-dom"
import { useFetch } from "../../utils/useFetch"
import styles from "./AuthorPage.module.css"
import Card from "../../components/Card"


function AuthorPage() {
    const location = useLocation()
    const name = location.state

    const param = useParams()
    const { table:authors, load: isLoadingAuthors } = useFetch("http://localhost:4000/api/authors")
    const { table, load } = useFetch(`http://localhost:4000/api/authors/${param.id}/posts`)

    if(load || isLoadingAuthors) {
        return <div className={styles.loading}>... Loading</div>
    }

    return (
        <>
        <aside className='container--left'>
                {!isLoadingAuthors 
                    && authors.map((author) => <Card key={author._id} author={author}/>) 
                }
            </aside>
        <div className="container--right">
            <h2>{ name }</h2>
            <div className={styles["container--post"]}>
                {table.map((post) => <Post key={post._id} post={post}/>)}
            </div>
        </div>
        </>
    )
}

export default AuthorPage