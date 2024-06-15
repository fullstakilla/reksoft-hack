import { Avatar } from "antd"
import { News } from "../api/types"
import styles from './NewsPost.module.scss'
import { Logo } from "@/shared/ui"

const NewsPost = (props: News) => {
    return (
        <div className={styles.container}>
            <header>
                <div className={styles.left}>
                    <Avatar size={64} src={props.authorAvatar} />
                    <div className={styles.info}>
                        <h3>{props.author}</h3>
                        <span>{props.category}</span>
                    </div>
                </div>
                <Logo />
            </header>
            <h2>{props.title}</h2>
            <span className={styles.desc}>{props.description}</span>
            <div className={styles.imgWrapper}>
                <img src={props.img} alt="" />
            </div>
        </div>
    )
}

export default NewsPost