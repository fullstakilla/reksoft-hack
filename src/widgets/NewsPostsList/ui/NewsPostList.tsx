import { News, NewsPost } from "@/entities/news";
import styles from './NewsPostList.module.scss'

interface NewsPostListInterface {
    news: News[]
}

const NewsPostList = ({news}: NewsPostListInterface) => {
    return (
        <div className={styles.container}>
            {news.length > 0 ?
                news.map((news, i) => 
                    <NewsPost key={i} {...news}/>
                ) :
                <div className={styles.empty}>Новостей нет</div>
            }
        </div>
    )
}

export default NewsPostList;