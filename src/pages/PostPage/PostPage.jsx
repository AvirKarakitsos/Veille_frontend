//import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/useFetch"

function PostPage() {
    const param = useParams()
    const { table, load } = useFetch(`http://localhost:4000/api/posts/${param.id}`)

    if(load) {
        return <div>...Loading</div>
    }

    return(
        <>
        <h2>{table.title}</h2>
        <div>
            <p>Lien: <a href={table.link}>{table.link}</a></p>
            <iframe src={table.link} height={500} width={1080}/>
        </div>
        </>
    )
}

export default PostPage