import { useNavigate } from "react-router-dom";
import styles from './Logo.module.scss'
import logo from '@/shared/assets/logo.svg'

const Logo = () => {
    const navigate = useNavigate()
    return (
        <img className={styles.logo} onClick={() => navigate('/')} src={logo} alt="Logo" />
    )
}

export default Logo;