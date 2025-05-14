import { findOrderByName } from "../../controllers/OrderDAO";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import styles from './FindOrder.module.css';
import { useEffect, useState } from "react";

function FindOrder({ user }) {
    const { register, handleSubmit } = useForm();

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = findOrderByName('', user.id);
        setOrders(data);
    }, [user.id])

    const handleSearch = (data) => {
        const Orders = findOrderByName(data.key, user.id);
        setOrders(Orders);
    }

    return (
        <div className={styles.orderSearchContainer}>
            <div className={styles.searchSection}>
                <form className={styles.searchForm} onSubmit={handleSubmit(handleSearch)}>
                    <input
                        className={styles.searchInput}
                        placeholder="Tìm kiếm đơn hàng..."
                        {...register('key')}
                        maxLength={50}
                    />
                    <button className={styles.searchButton} type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </div>
            <div className={styles.orderList}>
                {orders.map(({ order, event }, index) =>
                    <div className={styles.orderCard} onClick={() => navigate(`/orders/${order.id}`)} key={index}>
                        <div className={styles.orderHeader}>
                            <span className={styles.eventTitle}>{event.title}</span>
                            <span className={styles.eventTime}>
                                {new Date(event.startTime).toLocaleString()}
                            </span>
                        </div>
                        <div className={styles.organizer}>{event.org.name}</div>
                        <div className={styles.totalAmount}>
                            Tổng tiền: {order.finalAmount.toLocaleString('vi-VN')} đ
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FindOrder;