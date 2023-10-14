
import styles from '../assets/styles/card.module.css'

function Card({author}) {
    return (
        <div className={styles["main-container"]}>
            <div className={styles.container}> 
                <img className={styles["container__image"]} src={author.image} alt={author.name}/>
            </div>
            <h2 className={styles["container__name"]}>{author.name}</h2>
        </div>
    )
}

export default Card