import Post from "../../components/Post"
import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/useFetch"

function AuthorPage() {
    const param = useParams()
    const { table, load } = useFetch(`http://localhost:4000/api/authors/${param.id}/posts`)

    return (
        <>
        <h2>Author Page</h2>
        {!load
            && table.map((post) => <Post key={post._id} post={post}/>)}
        </>
    )
}

export default AuthorPage