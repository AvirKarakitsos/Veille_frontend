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
            <p>{post.link}</p>
            {/* <iframe src={post.link} height={500} width={500}/> */}
            {/* <iframe src="https://www.youtube.com/embed/PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX" width={1080} height={500} allowFullScreen/> */}
        </div>
        }
        </>
    )
}

export default PostPage