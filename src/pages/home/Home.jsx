import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Post from "../../components/Post"

function Home() {
    const [posts,setPosts] = useState(null)
    const [search,setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        fetch("http://localhost:4000/api/posts")
            .then((response) => response.json())
            .then((response) => {
                setPosts(response)
                setIsLoading(false)
            })
    },[])

    function handleSearch(e) {
        if(e.target.value.length >=3) {
            fetch(`http://localhost:4000/api/posts?search=${e.target.value}`)
                .then((response) => response.json())
                .then((response) => setPosts(response))
        } else if(e.target.value.length === 0) {
            fetch("http://localhost:4000/api/posts")
                .then((response) => response.json())
                .then((response) => setPosts(response))
        }
    }

    return (
        <>
            <h2>Home Page</h2>
            <Link to="/post">Ajouter un post</Link>
            <label>Rechercher
                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} onInput={handleSearch}/>
            </label>
            {!isLoading && posts.map((post) => <Post key={post._id} post={post}/>)}

        </>
    )
}

export default Home