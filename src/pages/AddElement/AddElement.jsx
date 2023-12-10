import { useState } from 'react'
import AddPost from '../../components/forms/AddPost'
import AddAuthor from '../../components/forms/AddAuthor'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import styles from "./AddElement.module.css"

const ListContainer = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 25px;
    list-style-type: none;
`

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Display = {
    POST: AddPost,
    AUTHOR: AddAuthor
}

function AddElement() {
    const [select, setSelect] = useState('POST')
    let CurrentView = Display[select]

    return(
        <>
        <section className='container--left'>
            <h2>Formulaire</h2>
            <ListContainer>
                <li className={styles.list}><Link to="/">{"Accueil"}</Link></li>
                <li className={styles.list} onClick={() => setSelect("POST")}>Ajouter un post</li>
                <li className={styles.list} onClick={() => setSelect("AUTHOR")}>Ajouter un dev</li>
            </ListContainer>
        </section>
        <section className='container--right'>
            <FormContainer>
                <CurrentView/>
            </FormContainer>
        </section>
        </>
    )
}

export default AddElement