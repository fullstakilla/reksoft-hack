import { Button } from 'antd';
import styles from './AddResumeBtn.module.scss'

interface AddResumeBtnInterface {
    setModalResumeOpen: (status: boolean) => void;
}

const AddResumeBtn = ({setModalResumeOpen}: AddResumeBtnInterface) => {
    return (
        <Button className={styles.addResumeBtn} type="primary" onClick={() => setModalResumeOpen(true)}>Обновить резюме</Button>
    )
}

export default AddResumeBtn;