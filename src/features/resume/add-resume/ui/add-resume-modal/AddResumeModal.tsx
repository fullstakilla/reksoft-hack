import { Button, Modal } from "antd";
import FirstResumeContent from "../first-content/FirstResumeContent";
import styles from './AddResumeModal.module.scss';
import { useState } from "react";
import { useForm } from "react-hook-form";
import SecondResumeContent from "../second-content/SecondResumeContent";
import ThirdResumeContent from "../third-content/ThirdResumeContent";
import { CloseOutlined } from "@ant-design/icons";
import { initialExperienceArr } from "@/shared/lib/consts";
import { Experience } from "../../model/types";
import { formatData } from "../../lib/format";
import { ResumeService } from "@/entities/resume";

interface AddResumeModalInterface {
    modalResumeOpen: boolean;
    setModalResumeOpen: (status: boolean) => void;
    setUploadResumeOpen: (status: boolean) => void;
}

const ModalTitle = <p className={styles.title}>Создание <span>резюме</span> для соискателя</p>;

const AddResumeModal = ({ modalResumeOpen, setModalResumeOpen, setUploadResumeOpen }: AddResumeModalInterface) => {
    const [pageNum, setPageNum] = useState<number>(1);
    const [experienceArr, setExperienceArr] = useState<Experience[]>(initialExperienceArr);
    const { control, handleSubmit, formState: { errors }, reset: resetInputs, unregister: unregisterInput} = useForm();

    const handleResumeSubmit = (data: any) => {
        if (pageNum === 3) {
            const formattedData = formatData(data)

            const submitResume = async() => {
                try {
                    const response = await ResumeService.createResume(formattedData)
                    console.log('submitted')
                    console.log(response.data)
                } catch (e) {
                    console.log(e)
                }
            }

            submitResume()
    
            handleCancel();
            return;
        }
    
        setPageNum((prevPageNum) => prevPageNum + 1);
    };

    const handleCancel = () => {
        setModalResumeOpen(false);
        setPageNum(1);
        resetInputs();
    };

    const handlePreviousPage = () => {
        setPageNum((prevPageNum) => prevPageNum - 1);
    };

    const handleAddExperience = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setExperienceArr([...experienceArr, { id: experienceArr.length + 1, company: '', jobPosition: '', responsibilities: '', workExperience: '' }]);
    };
    
    const handleDeleteExperience = (key: number) => {
        unregisterInput(`experience[${key}].company`);
        unregisterInput(`experience[${key}].jobPosition`);
        unregisterInput(`experience[${key}].responsibilities`);
        unregisterInput(`experience[${key}].workExperience`);
        setExperienceArr(() => experienceArr.filter(el => el.id !== key));
    };

    const handleOpenUploadResume = () => {
        setModalResumeOpen(false)
        setUploadResumeOpen(true)
    };

    return (
        <Modal
            open={modalResumeOpen}
            title={ModalTitle}
            onCancel={handleCancel}
            footer={null}
        >
            <form onSubmit={handleSubmit(handleResumeSubmit)}>
                {pageNum === 1 && <FirstResumeContent control={control} errors={errors} />}
                {pageNum === 2 && <SecondResumeContent control={control} errors={errors} />}
                {pageNum === 3 &&
                    experienceArr.map(exp => 
                        <div className={styles.expContent} key={exp.id}>
                            <header>
                                <h2 className={styles.expTitle}>Опыт работы {exp.id}</h2>
                                {exp.id !== 1 ? <CloseOutlined onClick={() => handleDeleteExperience(exp.id)}/> : null}
                            </header>
                            <ThirdResumeContent control={control} errors={errors} prefix={`experience[${exp.id}]`} />
                        </div>
                    )
                }
                {pageNum === 3 && <Button className={styles.addExpBtn} onClick={handleAddExperience}>Добавить опыт</Button>
                }
                <footer>
                    {pageNum !== 1 &&
                        <Button onClick={handlePreviousPage}>
                            Назад
                        </Button>
                    }
                    {pageNum === 1 &&
                        <p>Загрузить <span className={styles.fillAccent} onClick={handleOpenUploadResume}>готовое резюме</span>?</p>
                    }
                    <Button key="submit" type="primary" htmlType="submit">
                        {pageNum === 3 ? 'Создать' : 'Сохранить и продолжить'}
                    </Button>
                </footer>
            </form>
        </Modal>
    );
};

export default AddResumeModal;
