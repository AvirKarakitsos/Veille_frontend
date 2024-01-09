import Card from "./Card"
import { useFetch } from "../utils/useFetch"


function Aside() {
    const { table: authors, load: isLoadingAuthors } = useFetch("http://localhost:4000/api/authors")

    return(
        <aside className='container--left'>
        {!isLoadingAuthors 
            && authors.map((author) => <Card key={author._id} author={author}/>) 
        }
        </aside>
    )
}

export default Aside