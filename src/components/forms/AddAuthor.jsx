import { useState } from "react";
import InputText from "../InputText";
import styles from "./Form.module.css"


function AddAuthor() {
    const [data, setData] = useState({
        name: "",
        language: ""
    })

    function onChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return(
        <form>
            <legend>Ajouter un Dévelopeur</legend>
            <InputText style={styles["input-style"]} string="name" value={data.name} onChange={onChange} />
            <InputText style={styles["input-style"]} string="language" value={data.language} onChange={onChange} />
        </form>
    )
}

export default AddAuthor