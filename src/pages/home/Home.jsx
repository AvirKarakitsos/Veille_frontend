import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Post from "../../components/Post"

function Home() {
    const [posts,setPosts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        fetch("http://localhost:4000/api/posts")
            .then((response) => response.json())
            .then((response) => {
                setPosts(response)
                setIsLoading(false)
            })
    })

    return (
        <>
            <h2>Home Page</h2>
            <Link to="/post">Ajouter un post</Link>
            {!isLoading && posts.map((post) => <Post key={post._id} post={post}/>)}

        </>
    )
}

export default Home