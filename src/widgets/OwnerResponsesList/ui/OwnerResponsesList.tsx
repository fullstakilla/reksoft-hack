import { useEffect, useState } from 'react';
import styles from './OwnerResponsesList.module.scss';
import { VacanciesService, Vacancy } from '@/entities/vacancy';
import { useAppSelector } from '@/shared/model/redux-hooks';
import { Resume } from '@/entities/resume';

interface ServerResponse {
    id: number;
    resume_info: Resume;
    user_id: number;
    vacancy_info: Vacancy;
    status: string;
}

const OwnerResponsesList = () => {
    const [responses, setResponses] = useState<ServerResponse[]>([]);
    const { userId } = useAppSelector(state => state.session);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await VacanciesService.getOwnerVacancies(userId);

                console.log(response.data);
                setResponses(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchResponses();
    }, [userId]);

    if (responses === null) {
        return <span>Пусто.</span>;
    }

    return (
        <div className={styles.container}>
            {responses.map((response) => (
                <div key={response.id} className={styles.responseCard}>
                    <header className={styles.header}>
                        <h2>{response.vacancy_info.title}</h2>
                        <span className={styles.status} style={{ color: response.status === 'Ожидает ответа' ? 'red' : 'green' }}>
                            {response.status}
                        </span>
                    </header>
                    <div className={styles.details}>
                        <section className={styles.vacancyInfo}>
                            <h3>Детали вакансии</h3>
                            <p><strong>Занятость:</strong> {response.vacancy_info.employment}</p>
                            <p><strong>Зарплата:</strong> {response.vacancy_info.fork}</p>
                            <p><strong>Описание:</strong> {response.vacancy_info.description}</p>
                        </section>
                        <section className={styles.resumeInfo}>
                            {response.resume_info.userId !== 0 ?
                                <>
                                    <h3>Резюме соискателя</h3>
                                    <p><strong>Специальность:</strong> {response.resume_info.speciality}</p>
                                    <p><strong>Университет:</strong> {response.resume_info.university}</p>
                                    <p><strong>Опыт работы:</strong></p>
                                    <ul>
                                        {response.resume_info.experience && response.resume_info.experience.map((exp, index) => (
                                            <li key={index}>
                                                <p>{exp.jobPosition} в {exp.company}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </> :
                                <>
                                      <h3>У соискателя нет резюме</h3>
                                </>
                            }
                        </section>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OwnerResponsesList;