import { useOutletContext } from "react-router-dom";
import styles from './Page.module.scss'
import { HomeCards } from "@/widgets/home";

const MainPage = () => {
    const roleId = useOutletContext<roleIdType>();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Работа, о которой вы <span>мечтали</span>, всего в нескольких кликах!</h1>
            <HomeCards roleId={roleId}/>
        </div>
    )
}

export default MainPage;