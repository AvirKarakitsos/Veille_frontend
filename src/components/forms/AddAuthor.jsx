import { useRef } from 'react'
import styles from './Form.module.css'
import { useForm } from 'react-hook-form'

function AddAuthor() {
    const {register, handleSubmit} = useForm()
    const form = useRef()

    function onSubmit(data) {
        let formData = new FormData()
        let newAuthor = {
            name: data['name'],
            language: data['language']
        }
       
        formData.append('image', data['image'][0])
        formData.append('author', JSON.stringify(newAuthor))

        fetch("http://localhost:4000/api/authors",{
                method: "POST",
                body: formData
            })
            .then(response => {
                form.current.reset()
                return response.json()
            })
            .then(response => console.log(response.message))
            .catch(err => console.log(err.message))
    }

    return(
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles["form-container"]}>
                <legend>Ajouter un Dévelopeur</legend>
                <input {...register("name", {required: true})} className={styles["input-style"]} placeholder='Nom' autoComplete='off'/>
                <select {...register("language", {required: true})} className={styles["input-style"]}>
                    <option value=""></option>
                    <option value="french">Français</option>
                    <option value="english">Anglais</option>
                </select>
                <input {...register("image", {required: true})} type='file' className={styles["input-style"]}/>
                <button type="submit">Valider</button>
            </fieldset>
        </form>
    )
}

export default AddAuthor