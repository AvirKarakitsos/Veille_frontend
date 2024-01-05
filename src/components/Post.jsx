import { Link } from 'react-router-dom'
import styles from '../assets/styles/post.module.css'
import styled from 'styled-components'

const PostContainer = styled.article`
    width: 85%;
    padding: 0px 15px;
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background: linear-gradient(to left bottom, rgba(250,250,250,1), rgba(250,250,250,.8));
    box-shadow: 6px 6px 20px rgba(122,122,122,0.2)
`

function Post({post}) {
   
    return (
        <PostContainer>
                <div className={styles["container__sub"]}>
                    <img src={post.categoryId.logo} alt="logo" height="35px" width={35}/>
                    <Link to={`/post/${post._id}`} className={styles["container__link"]}>
                        <h3>{post.title}</h3>
                    </Link>
                </div>
                <div className={styles["container__sub"]}>
                    <p>{post.authorId.name}</p>
                    <img className={styles["container__sub__profil"]} src={post.authorId.image} alt="profil" height="35px" width={35}/>
                </div>
        </PostContainer>
    )
}

export default Post