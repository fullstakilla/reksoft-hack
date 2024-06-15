import { RegisterForm } from "@/features/auth/register"
import { useOutletContext } from "react-router-dom"
import styles from './Page.module.scss'

const RegisterPage = () => {
    const roleId = useOutletContext<roleIdType>();

    return (
        <div className={styles.container}>
            <RegisterForm roleId={roleId}/>
        </div>
    )
}

export default RegisterPage