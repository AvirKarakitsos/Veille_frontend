import InputText from '../../components/InputText'
import Select from '../../components/Select'

import styles from './Form.module.css'
import { useState } from 'react'
import { useEffect } from 'react'

function AddPost() {
    const [data, setData] = useState({
        title: "",
        categoryId: "",
        authorId: ""
    })
    const [categories, setCategories] = useState(null)
    const [authors, setAuthors] = useState(null)
    const [isLoading, setIsLoading] = useState({categories: true, authors: true})

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

    useEffect(()=>{
        fetch("http://localhost:4000/api/authors")
            .then((response) => response.json())
            .then((response) => {
                setAuthors(response)
                setIsLoading((values) => ({
                    ...values,
                    authors: false
                }))
            })
    },[])

    function onChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleAdd = function(e) {
        e.preventDefault()
        if((data.title === "") || (data.categoryId === "") || (data.authorId === "")) {
            document.querySelector('.form-message').innerHTML = "Veuillez compléter tous les champs"
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
                            authorId: '',
                            categoryId: ''
                        } ))
                    } 
                    return response.json()
                })
                .then(response => {
                    document.querySelector('.form-message').innerHTML = ""
                    console.log(response.message)
                    
                })
                .catch(err => console.log(err.message))
        }
    }

    return(
        <>
            <h2>Formulaire</h2>
            <form className={styles["form-container"]} onSubmit={handleAdd}>
                <label>Titre</label>
                <InputText style={styles["input-style"]} string="title" value={data.title} onChange={onChange}/>

                <label>Catégorie</label>
                {!isLoading.categories && <Select style={styles["input-style"]} string="categoryId" onChange={onChange}>
                    <option value=""></option>
                    {categories.map((category) => {
                    
                        return (<option key={category._id} value={category._id}>{category.title}</option>)
                        
                    })}
                </Select>}

                <label>Auteur</label>
                {!isLoading.authors && <Select style={styles["input-style"]} string="authorId" onChange={onChange}>
                    <option value=""></option>
                    {authors.map((author) => {
                        
                        return (<option key={author._id} value={author._id}>{author.name}</option>)
                        
                    })}
                </Select>}

                <p className='form-message'></p>

                <button type="submit">Valider</button>
            </form>
        </>
    )
}

export default AddPost