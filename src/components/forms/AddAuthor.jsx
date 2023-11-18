import styles from './Form.module.css'

function AddAuthor() {

    return(
        <form>
            <fieldset className={styles["form-container"]}>
                <legend>Ajouter un Dévelopeur</legend>
                <input type="text" className={styles["input-style"]}/>
                <input type="text" className={styles["input-style"]}/>
                <button type="submit">Valider</button>
            </fieldset>
        </form>
    )
}

export default AddAuthor