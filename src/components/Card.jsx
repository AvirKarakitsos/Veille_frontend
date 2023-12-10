import { Link } from 'react-router-dom'
import styles from '../assets/styles/card.module.css'

function Card({author}) {

    return (
        <figure className={styles.container}> 
            <Link 
                className={styles["main-container"]} 
                to={`/author/${author._id}`} 
                state={author.name}> 
                <img 
                    className={styles["container__image"]} 
                    src={author.image} alt={author.name}
                />
                <figcaption>
                    <h2 className={styles["container__name"]}>{author.name}</h2>
                </figcaption>
            </Link>
        </figure>
    )
}

export default Card