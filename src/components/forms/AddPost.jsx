import InputText from '../InputText'
import Select from '../Select'
import styles from './Form.module.css'
import { useRef, useState } from 'react'
import { useFetch } from '../../utils/useFetch'


function AddPost() {
    const [data, setData] = useState({
        title: "",
        source: "",
        link: "",
        categoryId: "",
        authorId: ""
    })
    const { table:categories, load: isLoadingCategories } = useFetch("http://localhost:4000/api/categories")
    const { table:authors, load: isLoadingAuthors } = useFetch("http://localhost:4000/api/authors")
    
    const formAdd = useRef()
    const formMessage = useRef()

    function onChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleAdd = function(e) {
        e.preventDefault()
        if((data.title === "") || (data.categoryId === "") || (data.authorId === "")) {
            formMessage.current.innerHTML = "Veuillez compléter tous les champs"
        } else {
            fetch("http://localhost:4000/api/posts",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if(response.ok) {
                        setData( values => ( {
                            ...values,
                            title: '',
                            link: '',
                            source: '',
                            categoryId: '',
                            authorId: ''
                        } ))
                        formAdd.current.reset()
                    } 
                    return response.json()
                })
                .then(response => {
                    formMessage.current.innerHTML = ""
                    console.log(response.message)
                })
                .catch(err => console.log(err.message))
        }
    }

    return(
        <form ref={formAdd} onSubmit={handleAdd}>
            <fieldset className={styles["form-container"]} >
                <legend>Ajouter un post</legend>
                <label className={styles["label-style"]}>Titre
                    <InputText style={styles["input-style"]} string="title" value={data.title} onChange={onChange}/>
                </label>

                <label className={styles["label-style"]}>Source
                    <Select style={styles["input-style"]} string="source" onChange={onChange}>
                        <option value=""></option>
                        <option value="twitter">Twitter</option>
                        <option value="youtube">Youtube</option>
                        <option value="article">Article</option>
                    </Select>
                </label>

                <label className={styles["label-style"]}>Lien
                    <InputText style={styles["input-style"]} string="link" value={data.link} onChange={onChange}/>
                </label>

                <label className={styles["label-style"]}>Catégorie
                    {!isLoadingCategories && <Select style={styles["input-style"]} string="categoryId" onChange={onChange}>
                        <option value=""></option>
                        {categories.map((category) => {
                        
                            return (<option key={category._id} value={category._id}>{category.title}</option>)

                        })}
                    </Select>}
                </label>

                <label className={styles["label-style"]}>Auteur
                    {!isLoadingAuthors && <Select style={styles["input-style"]} string="authorId" onChange={onChange}>
                        <option value=""></option>
                        {authors.map((author) => {

                            return (<option key={author._id} value={author._id}>{author.name}</option>)

                        })}
                    </Select>}
                </label>

                <p ref={formMessage}></p>

                <button type="submit">Valider</button>
            </fieldset>
        </form>
    )
}

export default AddPost