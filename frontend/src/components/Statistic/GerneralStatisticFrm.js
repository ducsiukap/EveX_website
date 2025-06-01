import { useEffect, useState } from "react";
import { findAllEventStatistic } from "../../controllers/CommunityEventDAO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleCheck, faEquals, faMoneyCheckDollar, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import styles from './GeneralStatistic.module.css'

function GeneralStatistic({ user }) {
    const [data, setData] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const statisticData = findAllEventStatistic(user.id);
        setData(statisticData);
    }, [user.id])

    const handleSelect = (event) => {
        console.log(event);
        navigate(`/statistics/${event.id}`);
    }

    if (!data) return <p className={styles.loadingState}>Loading...</p>;

    return (
        <div className={styles.statisticContainer}>
            {data.map((statistic, index) => (
                <div key={index}
                    className={styles.eventCard}
                    onClick={() => handleSelect(statistic.event)}>
                    <div className={styles.eventHeader}>
                        <FontAwesomeIcon icon={faEquals} className={styles.eventIcon} />
                        <span className={styles.eventTitle}>{statistic.event.title}</span>
                    </div>
                    <div className={styles.statisticGrid}>
                        <div className={styles.statisticItem}>
                            <FontAwesomeIcon icon={faMoneyCheckDollar} className={styles.statisticIcon} />
                            <span className={styles.statisticValue}>{statistic.revenue.toLocaleString('vi-VN')} đ</span>
                        </div>
                        <div className={styles.statisticItem}>
                            <FontAwesomeIcon icon={faCartPlus} className={styles.statisticIcon} />
                            <span className={styles.statisticValue}>{(statistic.bookingRate*100).toFixed(2)}%</span>
                        </div>
                        <div className={styles.statisticItem}>
                            <FontAwesomeIcon icon={faPersonCircleCheck} className={styles.statisticIcon} />
                            <span className={styles.statisticValue}>{(statistic.checkinRate*100).toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GeneralStatistic;