import { Button } from 'antd';
import styles from './AddVacancyBtn.module.scss'

interface AddVacancyBtnInterface {
    setModalVacancyOpen: (status: boolean) => void;
}

const AddVacancyBtn = ({setModalVacancyOpen}: AddVacancyBtnInterface) => {
    return (
        <Button className={styles.addVacancyBtn} type="primary" onClick={() => setModalVacancyOpen(true)}>Добавить Вакансию</Button>
    )
}

export default AddVacancyBtn;