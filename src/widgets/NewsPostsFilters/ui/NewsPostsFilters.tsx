import { FieldTimeOutlined, FireOutlined } from "@ant-design/icons";
import styles from './NewsPostsFilters.module.scss';
import { classNames } from "@/shared/lib/classNames";

interface NewsPostsFiltersProps {
    pickedFilter: number;
    setPickedFilter: (filter: number) => void;
}

const NewsPostsFilters = ({ pickedFilter, setPickedFilter }: NewsPostsFiltersProps) => {
    return (
        <div className={styles.filters}>
            <div
                className={classNames(styles.filter, { [styles.picked]: pickedFilter === 1 }, [])}
                onClick={() => setPickedFilter(1)}
            >
                <FireOutlined />
                Популярное
            </div>
            <div
                className={classNames(styles.filter, { [styles.picked]: pickedFilter === 2 }, [])}
                onClick={() => setPickedFilter(2)}
            >
                <FieldTimeOutlined />
                Новое
            </div>
        </div>
    );
};

export default NewsPostsFilters;
