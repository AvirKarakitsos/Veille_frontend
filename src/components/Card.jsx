import styles from '../assets/styles/card.module.css'
import { Link } from 'react-router-dom'

function Card({author}) {

    return (
        <figure className={styles.container}> 
            <Link 
                className={styles["main-container"]} 
                to={`/author/${author.name}`} 
                state={author._id}> 
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