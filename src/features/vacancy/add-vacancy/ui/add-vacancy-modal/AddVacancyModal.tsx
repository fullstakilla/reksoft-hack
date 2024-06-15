import { Button, Modal } from "antd";
import styles from './AddVacancyModal.module.scss';
import { useForm } from "react-hook-form";
import { FormInput } from "@/shared/ui";
import { VacanciesService } from "@/entities/vacancy";
import { useAppSelector } from "@/shared/model/redux-hooks";

interface AddVacancyModalInterface {
    modalVacancyOpen: boolean;
    setModalVacancyOpen: (status: boolean) => void;
}

const ModalTitle = <p className={styles.title}>Создание <span>вакансии</span> для соискателя</p>;

const AddVacancyModal = ({ modalVacancyOpen, setModalVacancyOpen }: AddVacancyModalInterface) => {
    const { control, handleSubmit, formState: { errors }, reset: resetInputs} = useForm();
    const {userId} = useAppSelector(state => state.session)

    const handleResumeSubmit = (data: any) => {
        console.log('submitted')
        console.log(data)

        handleCancel()
        const credentials = {...data, owner_id: userId}

        const submitResume = async() => {
            try {
                const response = await VacanciesService.createVacancy(credentials)
                console.log('submitted')
                console.log(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        submitResume()
    };

    const handleCancel = () => {
        setModalVacancyOpen(false)
        resetInputs()
    };

    return (
        <Modal
            open={modalVacancyOpen}
            title={ModalTitle}
            onCancel={handleCancel}
            footer={null}
        >
            <form onSubmit={handleSubmit(handleResumeSubmit)}>
            <div className={styles.container}>
                <FormInput 
                    name="title" 
                    control={control} 
                    errors={errors} 
                    rules={{
                        required: "Это поле обязательно.",
                    }} 
                    label="Название вакансии"
                    small
                />

                <FormInput 
                    name="employment" 
                    control={control} 
                    errors={errors} 
                    rules={{
                        required: "Это поле обязательно.",
                    }} 
                    label="Занятость работника"
                    small
                />

                <FormInput 
                    name="fork" 
                    control={control} 
                    errors={errors}
                    rules={{
                        required: "Это поле обязательно.",
                    }} 
                    label="Ценовая вилка"
                    small
                />
                <FormInput 
                    name="description" 
                    control={control} 
                    errors={errors} 
                    rules={{
                        required: "Это поле обязательно.",
                    }} 
                    label="Описание"
                    small
                />
            </div>
                <footer>
                    <span></span>
                    <Button key="submit" type="primary" htmlType="submit">
                       Сохранить и продолжить
                    </Button>
                </footer>
            </form>
        </Modal>
    );
};

export default AddVacancyModal;
