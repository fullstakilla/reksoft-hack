import { Logo } from '@/shared/ui';
import { Vacancy } from '../api/types';
import styles from './VacanciesCard.module.scss'
import { Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/shared/model/redux-hooks';
import { RespondVacancyBtn } from '@/features/vacancy/respond-vacancy';

interface VacanciesCardProps extends Vacancy {
    status?: string;
    noRespond?: boolean;
}

const VacanciesCard = (props: VacanciesCardProps) => {
    const { roleId } = useAppSelector(state => state.session);

    const shouldRenderFooter = roleId === 1 && (props.noRespond !== false);

    return (
        <div className={styles.container}>
            <header>
                <h2>{props.title}</h2>
                <Logo />
            </header>
            <span className={styles.fork}>
                {props.fork}
            </span>
            <div className={styles.employment}>
                {props.employment}
            </div>
            <span className={styles.description}>
                {props.description}
            </span>
            {props.status && <h2 style={{ color: 'red', marginTop: '30px' }}>{props.status}</h2>}
            {shouldRenderFooter && (
                <footer>
                    <RespondVacancyBtn vacancyId={props.id} />
                    <Button className={styles.starBtn}>
                        <StarOutlined className={styles.star} />
                    </Button>
                </footer>
            )}
        </div>
    );
};

export default VacanciesCard;
