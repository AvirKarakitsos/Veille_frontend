import InputText from '../../components/InputText'
import Select from '../../components/Select'

import styles from '../../assets/styles/Form.modules.css'
import { useState } from 'react'
import { useEffect } from 'react'

function AddPost() {
    const [data, setData] = useState({
        title: "",
        categoryId: ""
    })
    const [categories, setCategories] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        fetch("http://localhost:4000/api/categories")
            .then((response) => response.json)
            .then((response) => {
                setCategories(response)
                setIsLoading(false)
            })
    },[])

    function onChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return(
        <>
            <h2>Formulaire</h2>
            <form>
                <label>Titre</label>
                <InputText style={styles["input-style"]} string="title" value={data.title} onChange={onChange}/>

                <label>Catégorie</label>
                {!isLoading && <Select style={styles["input-style"]} string="categoryId" onChange={onChange}>
                    {categories.map((category) => {
                        return (<option key={category._id} value={category._id}>{category.title}</option>)
                    })}
                </Select>}
            </form>
        </>
    )
}

export default AddPost