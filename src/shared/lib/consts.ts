import first from '@/shared/assets/home-card-1.svg'
import second from '@/shared/assets/home-card-2.svg'
import third from '@/shared/assets/home-card-3.svg'
import fourth from '@/shared/assets/home-card-4.svg'

export const applicantHomeArr = [
    {
        logo: first,
        title: 'Создайте аккаунт',
        description: 'Получите доступ ко всем возможностям приложения',
        navigationLink: '/register'
    },
    {
        logo: second,
        title: 'Размещайте резюме',
        description: 'Создайте резюме в приложении или добавьте существующее ',
        navigationLink: '/'
    },
    {
        logo: third,
        title: 'Изучайте вакансии',
        description: 'Настройте параметры поиска вакансии и откликайтесь',
        navigationLink: '/'
    },
    {
        logo: fourth,
        title: 'Смотрите новости',
        description: 'Лента с актуальными новостями в сфере IT всегда под рукой',
        navigationLink: '/'
    },
]

export const recruiterHomeArr = [
    {
        logo: first,
        title: 'Создайте аккаунт',
        description: 'Получите доступ ко всем возможностям приложения',
        navigationLink: '/register'
    },
    {
        logo: second,
        title: 'Размещайте резюме',
        description: 'Создайте резюме в приложении или добавьте существующее ',
        navigationLink: '/'
    },
    {
        logo: third,
        title: 'Изучайте отклики',
        description: 'Взаимодействуйте с соискателями и их откликами в приложении',
        navigationLink: '/'
    },
    {
        logo: fourth,
        title: 'Смотрите новости',
        description: 'Лента с актуальными новостями в сфере IT всегда под рукой',
        navigationLink: '/'
    },
]

export const initialExperienceArr = [{ id: 1, company: '', jobPosition: '', responsibilities: '', workExperience: '' }];