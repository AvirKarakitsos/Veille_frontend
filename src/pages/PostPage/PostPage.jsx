import styles from "./PostPage.module.css"
import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/useFetch"
import { validatePathId } from "../../utils/validatePath"

function PostPage() {
    const param = useParams()
    const { table: posts, load: loadPosts } = useFetch(`http://localhost:4000/api/posts/all`)
    const { table, load } = useFetch(`http://localhost:4000/api/posts/${param.id}`)

    if(load || loadPosts) {
        return <div className="loading-page">... Loading</div>
    } else if(validatePathId(posts, param.id)) {
        return (
            <div className={styles["container-post"]}>
                <h2>{table.title}</h2>
                <div className={styles.section}>
                    <p>Lien: <a href={table.link}>{table.link}</a></p>
                    {!table.link.inlcudes("playlist?") && <iframe src={table.link} />}
                </div>
            </div>
        )
    } else {
        return <div className="loading-page">404</div>
    }
}

export default PostPage