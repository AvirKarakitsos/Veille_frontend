import styles from './Home.module.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Post from "../../components/Post"
import Select from '../../components/Select'

function Home() {
    const [posts,setPosts] = useState(null)
    const [data,setData] = useState({
        search: "",
        category: "all"
    })
    const [categories,setCategories] = useState(null)
    const [isLoading, setIsLoading] = useState({posts: true, categories: true})

    useEffect(()=>{
        if( data.category === "all") {
            fetch("http://localhost:4000/api/posts")
                .then((response) => response.json())
                .then((response) => {
                    setPosts(response)
                    setIsLoading((values) => ({
                        ...values,
                        posts: false
                    }))
                })
        } else {
            fetch(`http://localhost:4000/api/posts?categoryId=${data.category}`)
                .then((response) => response.json())
                .then((response) => setPosts(response))
        }
    },[data.category])

    useEffect(()=>{ 
        fetch("http://localhost:4000/api/categories")
            .then((response) => response.json())
            .then((response) => {
                setCategories(response)
                setIsLoading((values) => ({
                    ...values,
                    categories: false
                }))
            })
    },[])

    function onChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

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
            <Link to="/create">Ajouter un post</Link>
            <div>
                <label className={styles["label-style"]}>Rechercher
                    <input className={styles["input-style"]} name='search' type="text" onChange={onChange} value={data.search} onInput={handleSearch}/>
                </label>
                <label className={styles["label-style"]}> Catégorie
                    <Select style={styles["input-style"]} string="category" onChange={onChange}>
                        <option value="all">Tout</option>
                        {!isLoading.categories && categories.map((category) => <option key={category._id} value={category._id}>{category.title}</option>)}
                    </Select>
                </label>
            </div>
            {!isLoading.posts && posts.map((post) => <Post key={post._id} post={post}/>)}

        </>
    )
}

export default Home