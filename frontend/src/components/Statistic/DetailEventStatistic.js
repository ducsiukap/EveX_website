import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { findOneEventStatistic } from "../../controllers/CommunityEventDAO";

import styles from './DetailEventStatistic.module.css';

function DetailEventStatistic({ user }) {
    const { id } = useParams();
    const [data, setData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const statisticData = findOneEventStatistic(id, user.id);
        console.log(statisticData);
        if (!statisticData) navigate(`/statistics`);
        setData(statisticData);
    }, [id, user.id, navigate])

    if (!data) return <p className={styles.loadingState}>Loading...</p>

    return (
        <div className={styles.container}>
            <div className={styles.eventHeader}
                onClick={() => navigate(`/my-events/view/${data.event.id}`)}>
                <h3 className={styles.eventTitle}>{data.event.title}</h3>
                <p className={styles.totalRevenue}>
                    Tổng doanh thu: {data.revenue.toLocaleString('vi-VN')} đ.
                </p>
            </div>

            {data.rates.map((item, index) => (
                <div key={index} className={styles.ticketTypeCard}>
                    <div className={styles.ticketTypeHeader}>
                        <div className={styles.ticketTypeName}>
                            Loại vé: {item.ticketType.name}
                        </div>
                        <div className={styles.ticketTypeInfo}>
                            <span>Giá vé: {item.ticketType.price.toLocaleString('vi-VN')} đ</span>
                            <span>Số lượng: {item.ticketType.quantity}</span>
                        </div>
                    </div>

                    <div className={styles.statsContainer}>
                        <div className={styles.statsRow}>
                            <span className={styles.statsLabel}>
                                Số lượt mua: {item.bookingRate.amount}
                            </span>
                            <span className={styles.statsValue}>
                                Tỷ lệ mua vé: {(item.bookingRate.rate * 100).toFixed(2)}%
                            </span>
                        </div>
                        <div className={styles.statsRow}>
                            <span className={styles.statsLabel}>
                                Số lượt checkin: {item.checkinRate.amount}
                            </span>
                            <span className={styles.statsValue}>
                                Tỷ lệ checkin: {(item.checkinRate.rate * 100).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DetailEventStatistic;