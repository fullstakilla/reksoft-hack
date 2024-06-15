import { HomeCard } from "@/shared/ui";
import styles from './HomeCards.module.scss'
import { applicantHomeArr, recruiterHomeArr } from "@/shared/lib/consts";

interface HomeCardsInterface {
    roleId: roleIdType,
}

const HomeCards = ({roleId}: HomeCardsInterface) => {
    return (
        <div className={styles.cards}>
            {roleId === 1 && applicantHomeArr.map(card => (
                <HomeCard
                    logo={card.logo}
                    title={card.title}
                    description={card.description}
                    navigationLink={card.navigationLink}
                    key={card.title}
                />
            ))}
            {roleId === 2 && recruiterHomeArr.map(card => (
                <HomeCard
                    logo={card.logo}
                    title={card.title}
                    description={card.description}
                    navigationLink={card.navigationLink}
                    key={card.title}
                />
            ))}
        </div>
    )
}

export default HomeCards;