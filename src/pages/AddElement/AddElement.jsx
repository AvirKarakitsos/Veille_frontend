import { useState } from 'react'
import AddPost from '../../components/forms/AddPost'
import AddAuthor from '../../components/forms/AddAuthor'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ListContainer = styled.ul`
    width: 100%;
    display: flex;
    justify-content: center;
    column-gap:50px;
    list-style-type: none;
`

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 50px;
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
            <h2>Formulaire</h2>
            <ListContainer>
                <li onClick={() => setSelect("POST")}>Ajouter un post</li>
                <li onClick={() => setSelect("AUTHOR")}>Ajouter un dev</li>
            </ListContainer>
            <FormContainer>
                <CurrentView/>
            </FormContainer>
            <Link to="/">{"Retour à la page d'accueil"}</Link>
        </>
    )
}

export default AddElement