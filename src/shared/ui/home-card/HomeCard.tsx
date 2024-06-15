import { useNavigate } from 'react-router-dom'
import styles from './HomeCard.module.scss'

interface HomeCardInterface {
    logo: string,
    title: string,
    description: string,
    navigationLink: string
}

const HomeCard = ({logo, title, description, navigationLink}: HomeCardInterface) => {
    const navigate = useNavigate()

    return (
        <article className={styles.container} onClick={() => navigate(navigationLink)}>
            <img src={logo} alt="img" />
            <h1>{title}</h1>
            <p>{description}</p>
        </article>
    )
}

export default HomeCard;