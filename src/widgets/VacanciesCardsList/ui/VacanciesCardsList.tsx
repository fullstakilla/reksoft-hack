import { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { VacanciesCard, Vacancy } from "@/entities/vacancy";
import styles from './VacanciesCardsList.module.scss';

interface VacanciesCardsListInterface {
    vacancies: Vacancy[];
}

const VacanciesCardsList = ({ vacancies }: VacanciesCardsListInterface) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>(vacancies);

    useEffect(() => {
        setFilteredVacancies(vacancies);
    }, [vacancies]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const searchResults = vacancies.filter(vacancy =>
            vacancy.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVacancies(searchResults);
    };

    if (vacancies === null) {
        return <span>Пусто.</span>;
    }

    return (
        <div className={styles.container}>
            <header>
                <Input
                    placeholder="Поиск по названию"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginBottom: '10px' }}
                />
                <Button type="primary" onClick={handleSearch} style={{ marginBottom: '20px' }}>Поиск</Button>
            </header>
            <div className={styles.cards}>
                {filteredVacancies.length > 0 ?
                    filteredVacancies.map(vacancy => 
                        <VacanciesCard key={vacancy.id} {...vacancy} />
                    ) :
                    <div>Ничего не найдено.</div>
                }
            </div>
        </div>
    );
};

export default VacanciesCardsList;
