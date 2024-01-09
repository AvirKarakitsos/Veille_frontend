import styles from './Home.module.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Post from "../../components/Post"
import Aside from "../../components/Aside"
import Select from '../../components/Select'
import { useFetch } from '../../utils/useFetch'

function Home() {
    const [data, setData] = useState({
        search: "",
        category: "all",
        url: "http://localhost:4000/api/posts"
    })

    const { table: categories, load: isLoadingCategories } = useFetch("http://localhost:4000/api/categories")
    let { table: posts, load: isLoadingPosts, numberPage } = useFetch(data.url)

    useEffect(()=>{
        if( data.category === "all") {
            setData((values) => ({...values, url:"http://localhost:4000/api/posts"}))
        } else {
            setData((values) => ({...values, url:`http://localhost:4000/api/posts?categoryId=${data.category}`}) )
        }
    },[data.category])

    

    function onChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

        if(e.target.value.length >=3) {
            setData((values) => ({...values, url:`http://localhost:4000/api/posts?search=${e.target.value}`}))
        } else if(e.target.value.length === 0) {
            setData((values) => ({...values, url:"http://localhost:4000/api/posts"}))
        }
    }

    function changePage(e) {
        if(e.target.dataset.id) {
            let newUrl = new URL(data.url)
            if(!newUrl.searchParams.has("page")) newUrl.searchParams.append("page",e.target.dataset.id)
            else newUrl.searchParams.set("page",e.target.dataset.id)

            setData((values) => ({...values, url: newUrl}))

            //Change color of page number
            document.querySelector(".active").classList.remove("active")
            e.target.classList.add("active")
        } 
    }

    return (
        <>
            <Aside/>
            <main className='container--right'>
                <h1 className={styles["main-title"]}>Veille</h1>
                <button><Link to="/create">Ajouter un post</Link></button>
                <form className={styles["container--search"]}>
                    <input 
                        className={styles["style--input"]} 
                        name='search' type="text" 
                        onChange={onChange} 
                        value={data.search} 
                        onInput={onChange}
                        placeholder='Rechercher'
                        autoComplete='off'/>
                
                    <Select style={styles["style--input"]} string="category" onChange={onChange}>
                        <option value="all">Tout</option>
                        {!isLoadingCategories && categories.map((category) => <option key={category._id} value={category._id}>{category.title}</option>)}
                    </Select>
                </form>
                
                <div className={styles["container--post"]}>
                    {!isLoadingPosts && posts.map((post) => <Post key={post._id} post={post}/>)}
                </div>
                <div className='pagination' onClick={changePage}>
                {numberPage > 1 
                    && Array.from(Array(numberPage + 1).keys()).slice(1).map((page) => {
                        if(page === 1) return <span key={page} data-id={page} className='page active'>{page}</span>
                        else return <span key={page} data-id={page} className='page'>{page}</span>
                    })
                }
                </div>
            </main>
        </>
    )
}

export default Home