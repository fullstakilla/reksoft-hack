import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import FourthResumeContent from "../fourth-contenr/FourthResumeContent";
import styles from './UploadResumeModal.module.scss'
import { formatPdf } from "../../lib/format";
import { useState } from "react";
import { ResumeService } from "@/entities/resume";
import { useAppSelector } from "@/shared/model/redux-hooks";

interface UploadResumeModalInterface {
    uploadResumeOpen: boolean;
    setUploadResumeOpen: (status: boolean) => void;
    setModalResumeOpen: (status: boolean) => void;
    refreshData: boolean
    setRefreshData: (status: boolean) => void;
}

const ModalTitle = <h3>Добавление <span className={styles.fill}>резюме</span> для соискателя</h3>

const UploadResumeModal = ({uploadResumeOpen, setUploadResumeOpen, setModalResumeOpen, refreshData, setRefreshData}: UploadResumeModalInterface) => {
    const { control, handleSubmit, formState: { errors }, reset: resetInputs } = useForm();
    const [error, setError] = useState<string>('')
    const {userId} = useAppSelector(state => state.session)

    const handleResumeSubmit = (data: any) => {
        setError('')
        const {pdfFile} = data
        console.log(data)

        if (pdfFile === undefined || pdfFile.length === 0) {
            setError('Вы ничего не прикрепили')
            return
        }

        const formattedPdf = formatPdf(pdfFile)

        const submitPdfResume = async() => {
            try {
                const response = await ResumeService.createFileResume(userId, formattedPdf)
                console.log('submitted')
                console.log(response.data)

                setRefreshData(!refreshData)
            } catch (e) {
                console.log(e)
            }
        }

        submitPdfResume()

        handleCancel()
    };

    const handleOpenModalResume = () => {
        setModalResumeOpen(true)
        setUploadResumeOpen(false)
        setError('')

    }
    const handleCancel = () => {
        setUploadResumeOpen(false)
        resetInputs();
        setError('')
    }

    return (
        <Modal
            open={uploadResumeOpen}
            title={ModalTitle}
            onCancel={handleCancel}
            footer={null}
        >
            <form onSubmit={handleSubmit(handleResumeSubmit)}>
                <FourthResumeContent control={control} errors={errors}/>
                <span style={{color: 'red'}}>{error}</span>
                <footer>
                    <p>Заполнить резюме <span className={styles.fillAccent} onClick={handleOpenModalResume}>вручную</span>?</p>
                    <Button key="submit" type="primary" htmlType="submit">
                        Загрузить
                    </Button>
                </footer>
            </form>
        </Modal>
    )
}

export default UploadResumeModal;