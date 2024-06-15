import { LoginForm } from "@/features/auth/login"
import { useOutletContext } from "react-router-dom"
import styles from './Page.module.scss'

const LoginPage = () => {
    const roleId = useOutletContext<roleIdType>();

    return (
        <div className={styles.container}>
            <LoginForm roleId={roleId}/>
        </div>
    )
}

export default LoginPage