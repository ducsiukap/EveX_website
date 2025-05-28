import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getOrderById } from "../../controllers/OrderDAO";
import ViewCEForm from '../ViewCEForm';
import styles from './ViewOrder.module.css'

function ViewOrder({ user }) {
    const { id } = useParams();
    const navigate = useNavigate()
    const [order, setOrder] = useState();
    const [event, setEvent] = useState();
    useEffect(() => {
        const data = getOrderById(id);
        // console.log(data);
        if (!data) navigate('/orders', { replace: true });
        setOrder(data.order);
        setEvent(data.event);
    }, [id, navigate])

    if (!order || !event) return <p>Loading...</p>

    if (order.user.id !== user.id) navigate('/orders', { replace: true });

    return (
        <div className={styles.orderContainer}>
            <ViewCEForm event={event} />

            <section className={styles.orderSection}>
                <header className={styles.sectionHeader}>
                    <span className={styles.sectionTitle}>Thông tin đơn hàng</span>
                </header>
                <main className={styles.sectionBody}>
                    <div className={styles.orderInfo}>
                        <div className={styles.orderInfoItem}>
                            <span>Thời gian đặt hàng:</span>
                            <span>{new Date(order.orderTime).toLocaleString('vi-VN')}</span>
                        </div>
                        <div className={styles.orderInfoItem}>
                            <span>Tổng số tiền:</span>
                            <span className={styles.amount}>{order.totalAmount.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        <div className={styles.orderInfoItem}>
                            <span>Số tiền giảm:</span>
                            <span className={styles.amount}>{order.discountAmount.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        <div className={styles.orderInfoItem}>
                            <span>Số tiền thanh toán:</span>
                            <span className={styles.finalAmount}>{order.finalAmount.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                    </div>
                </main>
            </section>

            <section className={styles.orderSection}>
                <header className={styles.sectionHeader}>
                    <div className={styles.sectionTitle}>Danh sách vé</div>
                    <div className={styles.ticketCount}>{order.tickets.length}</div>
                </header>
                <main className={styles.sectionBody}>
                    <div className={styles.ticketList}>
                        {order.tickets.map((item, index) =>
                            <div className={styles.ticketCard} key={index}>
                                <div className={styles.ticketHeader}>
                                    <span className={styles.ticketNumber}>Vé {index + 1}</span>
                                    <span className={`${styles.checkinStatus} ${item.checkedAt ? styles.checkedIn : styles.notCheckedIn}`}>
                                        {item.checkedAt ? "Đã checkin" : "Chưa checkin"}
                                    </span>
                                </div>
                                <div className={styles.ticketCode}>
                                    {item.code}
                                </div>
                                <div className={styles.ticketPrice}>
                                    Giá vé: {item.price.toLocaleString('vi-VN')} VNĐ
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </section>
        </div>
    );
}

export default ViewOrder;