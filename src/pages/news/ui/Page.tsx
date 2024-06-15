import { NewsPostList } from "@/widgets/NewsPostsList";
import styles from './Page.module.scss';
import { useEffect, useState } from "react";
import { News, NewsService } from "@/entities/news";
import { NewsPostsFilters } from "@/widgets/NewsPostsFilters";

const NewsPage = () => {
    const [news, setNews] = useState<News[]>([]);
    const [filteredNews, setFilteredNews] = useState<News[]>([]);
    const [pickedFilter, setPickedFilter] = useState<number>(1);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await NewsService.getNews();

                setNews(response.data);
                setFilteredNews(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        if (pickedFilter === 1) {
            setFilteredNews(news);
        } else if (pickedFilter === 2) {
            setFilteredNews([...news].reverse());
        }
    }, [pickedFilter, news]);

    return (
        <div className={styles.container}>
            <NewsPostsFilters pickedFilter={pickedFilter} setPickedFilter={setPickedFilter} />
            <NewsPostList news={filteredNews} />
        </div>
    );
};

export default NewsPage;
