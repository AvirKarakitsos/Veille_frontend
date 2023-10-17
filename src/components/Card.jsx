import { Link } from 'react-router-dom'
import styles from '../assets/styles/card.module.css'
import { useState } from 'react';

function Card({author}) {
    const [isShown, setIsShown] = useState(false)

    return (
        <figure className={styles.container}> 
            <Link className={styles["main-container"]} to={`/author/${author._id}`}> 
                <img 
                    className={styles["container__image"]} 
                    src={author.image} alt={author.name}
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                />
                {isShown  && <figcaption>
                    <h2 className={styles["container__name"]}>{author.name}</h2>
                </figcaption>}
            </Link>
        </figure>
    )
}

export default Card