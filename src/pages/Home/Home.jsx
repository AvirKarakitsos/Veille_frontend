import styles from './Home.module.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Post from "../../components/Post"
import Card from "../../components/Card"
import Select from '../../components/Select'
import { useFetch } from '../../utils/useFetch'

function Home() {
    const [posts, setPosts] = useState(null)
    const [isLoading, setIsLoading] = useState({posts: true})
    
    const { table:categories, load: isLoadingCategories } = useFetch("http://localhost:4000/api/categories")
    const { table:authors, load: isLoadingAuthors } = useFetch("http://localhost:4000/api/authors")
    
    const [data, setData] = useState({
        search: "",
        category: "all"
    })

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
            <div className={styles["container--card"]}>
                {!isLoadingAuthors 
                    && authors.map((author) => <Card key={author._id} author={author}/>) 
                }
            </div>
            <button><Link to="/create">Ajouter un post</Link></button>
            <div className={styles["container--search"]}>
                <input 
                    className={styles["style--input"]} 
                    name='search' type="text" 
                    onChange={onChange} 
                    value={data.search} 
                    onInput={handleSearch}
                    placeholder='Rechercher'
                    autoComplete='off'/>
                <label className={styles["style--label"]}> Catégorie
                    <Select style={styles["style--input"]} string="category" onChange={onChange}>
                        <option value="all">Tout</option>
                        {!isLoadingCategories && categories.map((category) => <option key={category._id} value={category._id}>{category.title}</option>)}
                    </Select>
                </label>
            </div>
            <div className={styles["container--post"]}>
                {!isLoading.posts && posts.map((post) => <Post key={post._id} post={post}/>)}
            </div>
        </>
    )
}

export default Home