export type Vacancy = {
    description: string,
    employment: 'Полная занятость' | 'Частичная занятость' | 'Стажировка',
    fork: string,
    id: number,
    owner_id: number,
    title: string
}

export type VacancyResponse = {
    id: number
    status: string
    user_id: number
    vacancy_info: Vacancy
}