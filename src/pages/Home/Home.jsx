import styles from './Home.module.css'
import Post from "../../components/Post"
import Aside from "../../components/Aside"
import Select from '../../components/Select'
import { Link } from "react-router-dom"
import { useFetch } from '../../utils/useFetch'
import { useRef, useState } from "react"

function Home() {
    const divRef = useRef(null)
    const [data, setData] = useState({
        search: "",
        category: "all",
        url: "http://localhost:4000/api/posts"
    })

    const { table: categories, load: isLoadingCategories } = useFetch("http://localhost:4000/api/categories")
    const { table: posts, load: isLoadingPosts, numberPage } = useFetch(data.url)

    function onChange(e) {
        let newUrl = new URL(data.url)

        if(e.target.name === "search") {
            
            if(e.target.value.length >=3) {
                if(!newUrl.searchParams.has("search")) newUrl.searchParams.append("search",e.target.value)
                else newUrl.searchParams.set("search",e.target.value)
                if(newUrl.searchParams.has("page")) newUrl.searchParams.delete("page")

                setData((values) => ({...values, url: newUrl.href}))
            } else if(e.target.value.length === 0) {
                newUrl.searchParams.delete("search")
                if(newUrl.searchParams.has("page")) newUrl.searchParams.delete("page")

                setData((values) => ({...values, url: newUrl.href}))
            }
        } else if(e.target.name === "category") {
            if( e.target.value === "all") {
                newUrl.searchParams.delete("categoryId")
                if(newUrl.searchParams.has("page")) newUrl.searchParams.delete("page")

                setData((values) => ({...values, url: newUrl.href, category: e.target.value}))
            } else {
                if(!newUrl.searchParams.has("categoryId")) newUrl.searchParams.append("categoryId",e.target.value)
                else newUrl.searchParams.set("categoryId",e.target.value)
                if(newUrl.searchParams.has("page")) newUrl.searchParams.delete("page")

                setData((values) => ({...values, url: newUrl.href, category: e.target.value}) )
            }

            for(let item of divRef.current.children) {
                item.classList.remove('active')
            }
            divRef.current.children[0]?.classList.add('active')
        }

    }

    function changePage(e) {
        if(e.target.dataset.id) {
            let newUrl = new URL(data.url)
            if(!newUrl.searchParams.has("page")) newUrl.searchParams.append("page",e.target.dataset.id)
            else newUrl.searchParams.set("page",e.target.dataset.id)

            setData((values) => ({...values, url: newUrl.href}))
            
            //Change color of page number
            for(let item of divRef.current.children) {
                item.classList.remove('active')
            }
            divRef.current.children[e.target.dataset.id-1].classList.add("active")
          
        } 
    }

    return (
        <>
            <Aside/>
            <main className='container--right'>
                <h1 className={styles["main-title"]}>Veille</h1>
                <div className={styles.header}>
                    <button><Link to="/create">Ajouter un post</Link></button>
                    <form className={styles["container--search"]}>
                        <input 
                            className={styles["style--input"]} 
                            name='search' type="text" 
                            onChange={(e) => setData((values) => ({...values,search: e.target.value}))} 
                            value={data.search} 
                            onInput={onChange}
                            placeholder='Rechercher'
                            autoComplete='off'/>

                        <Select style={styles["style--input"]} string="category" onChange={onChange}>
                            <option value="all">Tout</option>
                            {!isLoadingCategories && categories.map((category) => <option key={category._id} value={category._id}>{category.title}</option>)}
                        </Select>
                    </form>
                </div>
                
                <div className={styles["container--post"]}>
                    {!isLoadingPosts && posts.map((post) => <Post key={post._id} post={post}/>)}
                </div>
                <div ref={divRef} className={styles.pagination} onClick={changePage}>
                {numberPage > 1 
                    && Array.from(Array(numberPage + 1).keys()).slice(1).map((page) => {
                        if(page === 1) return <span key={page} data-id={page} className={styles.page+" numberPage active"}>{page}</span>
                        else return <span key={page} data-id={page} className={styles.page+" numberPage"}>{page}</span>
                    })
                }
                </div>
            </main>
        </>
    )
}

export default Home