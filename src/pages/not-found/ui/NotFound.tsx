import { Button, Result } from "antd";
import styles from './NotFound.module.scss'
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <Result
                status="404"
                title="404"
                subTitle="Похоже страница, которую вы хотите посетить, не существует"
                extra={<Button type="primary" onClick={() => navigate('/')}>Вернуться на главную</Button>}
            />
        </div>
    )
}

export default NotFound;