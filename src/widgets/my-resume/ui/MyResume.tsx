import { Resume, ResumeService } from "@/entities/resume";
import { useAppSelector } from "@/shared/model/redux-hooks";
import { useEffect, useState } from "react";
import styles from './MyResume.module.scss'

interface MyResumeInterface {
    refreshData: boolean
}

const MyResume = ({refreshData}: MyResumeInterface) => {
    const { userId, name, surname, patronymic, email, phone } = useAppSelector(state => state.session)
    const [resume, setResume] = useState<Resume>()
    const [pdfFile, setPdfFile] = useState<string>()

    console.log('render')

    useEffect(() => {
        const fetchMyResume = async () => {
            if (!userId) return;

            try {
                const response = await ResumeService.getResume(userId);
                console.log('Resume data:', response.data);
                setResume(response.data);
            } catch (error) {
                console.error('Error fetching resume:', error);
            }
        }

        const fetchFileResume = async () => {
            if (!userId) return;

            try {
                const response = await ResumeService.getFileResume(userId, { responseType: 'arraybuffer' });
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setPdfFile(url);
                console.log('PDF file fetched successfully');
            } catch (error) {
                console.error('Error fetching PDF file:', error);
            }
        }

        fetchMyResume();
        fetchFileResume();
    }, [userId, refreshData]);

    return (
        <div className={styles.card}>
            <header>
                <h2>{surname} {name} {patronymic}</h2>
                {pdfFile && <a href={pdfFile} download="resume.pdf">Download Resume</a>}
            </header>
            <div className={styles.infocards}>
                <div className={styles.infocard}>
                    <span>Пол</span>
                    <b>{resume?.genderId === 1 ? 'Мужской' : 'Женский'}</b>
                </div>
                <div className={styles.infocard}>
                    <span>Дата рождения</span>
                    <b>{resume?.birthDate.slice(0, 10)}</b>
                </div>
                <div className={styles.infocard}>
                    <span>Город</span>
                    <b>{resume?.city}</b>
                </div>
                <div className={styles.infocard}>
                    <span>Гражданство</span>
                    <b>{resume?.citizenship}</b>
                </div>
                <div className={styles.infocard}>
                    <span>Почта</span>
                    <b>{email}</b>
                </div>
                <div className={styles.infocard}>
                    <span>Телефон</span>
                    <b>{phone}</b>
                </div>
            </div>
            <div className={styles.education}>
                <span>Образование</span>
                <b>Уровень образования: {resume?.education}</b>
                <b>Университет: {resume?.university}</b>
                <b>Специальность: {resume?.speciality}</b>
            </div>
            <div className={styles.experience}>
                {resume?.experience.map(e => (
                    <div className={styles.exp} key={e.id}>
                        <span>Опыт работы</span>
                        <b>Название компании: {e.company}</b>
                        <b>Должность: {e.jobPosition}</b>
                        <b>Обязанности: {e.jobPosition}</b>
                        <b>Опыт работы: {e.workExperience}</b>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyResume;
