import { MyResponsesList } from '@/widgets/MyResponsesList';
import styles from './Page.module.scss'

const Page = () => {
    return (
        <div className={styles.container}>
            <MyResponsesList />
        </div>
    )
}

export default Page;