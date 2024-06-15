import { useAppSelector } from "@/shared/model/redux-hooks";
import { Button, message } from "antd";
import styles from './RespondVacancyBtn.module.scss'
import { VacanciesService } from "@/entities/vacancy";

interface RespondVacancyBtnInterface {
    vacancyId: number
}

const RespondVacancyBtn = ({vacancyId}: RespondVacancyBtnInterface) => {
    const {userId} = useAppSelector(state => state.session)
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
        type: 'success',
        content: 'Вы успешно откликнулись',
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await VacanciesService.respondVacancy(userId, vacancyId)
            console.log('submitted')
            console.log(response.data)
            success()
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" className={styles.replyBtn} onClick={handleSubmit}>Откликнуться</Button>
        </>
    )
}

export default RespondVacancyBtn;