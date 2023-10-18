import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function PostPage() {
    const [post,setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const param = useParams()
    
    useEffect(()=> {
        fetch(`http://localhost:4000/api/posts/${param.id}`)
            .then((response) => response.json())
            .then((response) => {
                setPost(response)
                setIsLoading(false)
            })
    },[param.id])

    return(
        <>
        {!isLoading && 
        <div>
            <h2>{post.title}</h2>
            <iframe src={post.link} height={500} width={1080}/>
        </div>
        }
        </>
    )
}

export default PostPage