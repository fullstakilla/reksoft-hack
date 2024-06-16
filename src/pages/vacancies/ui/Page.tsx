import { VacanciesCardsList } from '@/widgets/VacanciesCardsList';
import styles from './Page.module.scss'
import { VacanciesCardsFilters } from '@/widgets/VacanciesCardsFilters';
import { useEffect, useState } from 'react';
import { VacanciesService, Vacancy } from '@/entities/vacancy';

const VacanciesPage = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([])
    const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>(vacancies);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await VacanciesService.getVacancies()
                const reversedVacancies = response.data.map((_, idx, arr) => arr[arr.length - 1 - idx]);

                setVacancies(reversedVacancies)
                setFilteredVacancies(reversedVacancies);

            } catch (e) {
                console.log(e)
            }
        }

        fetchVacancies()
    }, [])

    const handleFilter = (filteredVacancies: Vacancy[]) => {
        setFilteredVacancies(filteredVacancies);
    };

    return (
        <div className={styles.container}>
            <VacanciesCardsFilters vacancies={vacancies} onFilter={handleFilter}/>
            <VacanciesCardsList vacancies={filteredVacancies}/>
        </div>
    )
}

export default VacanciesPage;