import { useState } from 'react';
import { Checkbox, Button, InputNumber } from 'antd';
import { Vacancy } from '@/entities/vacancy';
import styles from './VacanciesCardsFilters.module.scss';

interface VacanciesCardsFiltersProps {
    vacancies: Vacancy[];
    onFilter: (filteredVacancies: Vacancy[]) => void;
}

const VacanciesCardsFilters = ({ vacancies, onFilter }: VacanciesCardsFiltersProps) => {
    const [selectedEmployment, setSelectedEmployment] = useState<{
        fullTime: boolean;
        partTime: boolean;
        internship: boolean;
    }>({
        fullTime: false,
        partTime: false,
        internship: false
    });

    const [salaryRange, setSalaryRange] = useState<{ min: number | null, max: number | null }>({
        min: null,
        max: null
    });

    const handleCheckboxChange = (e: any) => {
        const { name, checked } = e.target;
        setSelectedEmployment(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSalaryChange = (value: number | null, type: 'min' | 'max') => {
        setSalaryRange(prevState => ({
            ...prevState,
            [type]: value
        }));
    };

    const applyFilter = () => {
        const filteredVacancies = vacancies.filter(vacancy => {
            const matchesEmployment = (
                (selectedEmployment.fullTime && vacancy.employment === 'Полная занятость') ||
                (selectedEmployment.partTime && vacancy.employment === 'Частичная занятость') ||
                (selectedEmployment.internship && vacancy.employment === 'Стажировка')
            );

            const [minSalary, maxSalary] = vacancy.fork
                .split(' - ')
                .map(s => parseInt(s.replace(/\D/g, ''), 10));

            const matchesSalary = (
                (salaryRange.min === null || minSalary >= salaryRange.min) &&
                (salaryRange.max === null || maxSalary <= salaryRange.max)
            );

            return (matchesEmployment || (!selectedEmployment.fullTime && !selectedEmployment.partTime && !selectedEmployment.internship)) && matchesSalary;
        });

        onFilter(filteredVacancies);
    };

    return (
        <div className={styles.container}>
            <h3>Занятость</h3>
            <Checkbox className={styles.checkbox} name="fullTime" checked={selectedEmployment.fullTime} onChange={handleCheckboxChange}>
                Полная занятость
            </Checkbox>
            <Checkbox className={styles.checkbox} name="partTime" checked={selectedEmployment.partTime} onChange={handleCheckboxChange}>
                Частичная занятость
            </Checkbox>
            <Checkbox className={styles.checkbox} name="internship" checked={selectedEmployment.internship} onChange={handleCheckboxChange}>
                Стажировка
            </Checkbox>

            <h3>Зарплата</h3>
            <div className={styles.salaryRange}>
                <InputNumber
                    placeholder="От"
                    value={salaryRange.min}
                    onChange={(value) => handleSalaryChange(value, 'min')}
                />
                <InputNumber
                    placeholder="До"
                    value={salaryRange.max}
                    onChange={(value) => handleSalaryChange(value, 'max')}
                />
            </div>
            
            <Button className={styles.submitBtn} onClick={applyFilter}>
                Применить фильтр
            </Button>
        </div>
    );
};

export default VacanciesCardsFilters;
