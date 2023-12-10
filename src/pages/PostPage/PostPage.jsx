//import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/useFetch"
import styles from "./PostPage.module.css"

function PostPage() {
    const param = useParams()
    const { table, load } = useFetch(`http://localhost:4000/api/posts/${param.id}`)

    if(load) {
        return <div className="loading-page">...Loading</div>
    }

    return(
        <div className={styles["container-post"]}>
            <h2>{table.title}</h2>
            <div className={styles.section}>
                <p>Lien: <a href={table.link}>{table.link}</a></p>
                <iframe src={table.link} />
            </div>
        </div>
    )
}

export default PostPage