import AddPost from '../../components/forms/AddPost'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center
`

function AddElement() {
    
    return(
        <>
            <h2>Formulaire</h2>
            <FormContainer>
                <AddPost/>
            </FormContainer>
            <Link to="/">{"Retour à la page d'accueil"}</Link>
        </>
    )
}

export default AddElement