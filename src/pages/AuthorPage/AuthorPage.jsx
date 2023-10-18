import Post from "../../components/Post"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function AuthorPage() {
    const param = useParams()
    const [posts,setPosts] = useState(null)
    const [isLoading,setIsLoading] = useState({posts: true})

    useEffect(()=>{ 
        fetch(`http://localhost:4000/api/authors/${param.id}/posts`)
            .then((response) => response.json())
            .then((response) => {
                setPosts(response)
                setIsLoading((values) => ({
                    ...values,
                    posts: false
                }))
            })
    },[param.id])

    return (
        <>
        <h2>Author Page</h2>
        {!isLoading.posts
            && posts.map((post) => <Post key={post._id} post={post}/>)}
        </>
    )
}

export default AuthorPage