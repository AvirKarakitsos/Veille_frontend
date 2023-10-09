import styles from '../assets/styles/post.module.css'

function Post({post}) {
    return (
        <div className={styles.container}>
            <div className={styles["container__sub"]}>
                <img src={post.categoryId.logo} alt="logo" height="35px" width={35}/>
                <h3>{post.title}</h3>
            </div>
            <div className={styles["container__sub"]}>
                <p>{post.authorId.name}</p>
                <img className={styles["container__sub__profil"]} src={post.authorId.image} alt="profil" height="35px" width={35}/>
            </div>
        </div>
    )
}

export default Post