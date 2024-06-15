import { VacanciesCard, VacanciesService, VacancyResponse } from "@/entities/vacancy";
import { useAppSelector } from "@/shared/model/redux-hooks";
import { useEffect, useState } from "react";
import styles from './MyResponsesList.module.scss'

const MyResponsesList = () => {
    const [vacancies, setVacancies] = useState<VacancyResponse[]>([])
    const { userId } = useAppSelector(state => state.session)

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await VacanciesService.getUserVacancies(userId)

                setVacancies(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchVacancies()
    }, [userId])

    return (
        <div className={styles.container}>
            {vacancies.length > 0 ?
                vacancies.map((vacancy, i) => 
                    <VacanciesCard key={i} {...vacancy.vacancy_info} status={vacancy.status} noRespond={false}/>
                ) :
                <div>Ничего не найдено.</div>
            }
        </div>
    )
}

export default MyResponsesList;
