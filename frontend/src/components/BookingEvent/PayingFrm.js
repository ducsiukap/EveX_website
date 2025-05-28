import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ViewCEForm from "../ViewCEForm";
import { addOrder } from "../../controllers/OrderDAO";

import styles from './Paying.module.css';
function Paying({ user }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [event, setEvent] = useState();
    const [voucher, setVoucher] = useState();
    const [order, setOrder] = useState();


    useState(() => {
        const data = location.state;
        if (!data) navigate(`/explore`, { replace: true });
        console.log(data);
        setEvent(data.event);
        setVoucher(data.voucher);
        let totalAmount, discountAmount, finalAmount;
        totalAmount = 0;
        discountAmount = 0;
        finalAmount = 0;

        const bookingData = data.bookingData;
        const Order = { tickets: [] };
        data.event.ticketTypes.forEach((ticket) => {
            if (bookingData[ticket.id]) {
                const amount = Number(bookingData[ticket.id]);
                totalAmount += amount * ticket.price;
                Order.tickets.push({ id: ticket.id, name: ticket.name, price: ticket.price, amount: amount });
            }
        })

        if (data.voucher)
            discountAmount = data.voucher.type === 'fixed' ? Math.min(data.voucher.value, totalAmount) : totalAmount * data.voucher.value / 100;

        finalAmount = totalAmount - discountAmount;

        Order.totalAmount = totalAmount;
        Order.discountAmount = discountAmount;
        Order.finalAmount = finalAmount;

        // console.log(order);
        setOrder(Order);
        // const
    }, [])

    const handlePaying = () => {
        const postData = {
            body: {
                order: {
                    userID: user.id,
                    voucherId: voucher?.id
                },
                ticketTypes: order.tickets.map(item => { return { id: item.id, amount: item.amount } }),
                eventId: event.id
            }
        }

        const orderId = addOrder(postData);
        if (orderId > 0) navigate(`/orders/${orderId}`, { replace: true });
        else {
            alert(`Thanh toán thất bại! ${orderId}`);
            navigate(`/explore/${event.id}`);
        }
    }

    if (!event || !order) return <p>Loading...</p>

    return (
        <div className={styles.orderContainer}>
            <ViewCEForm event={event} />

            <section className={styles.orderSection}>
                <header className={styles.sectionHeader}>
                    <div className={styles.sectionTitle}>Thông tin đặt hàng</div>
                    <div className={styles.ticketCount}>{order.tickets.length}</div>
                </header>
                <main className={styles.sectionBody}>
                    <div className={styles.ticketList}>
                        {order.tickets.map((item, index) =>
                            <div className={styles.ticketCard} key={index}>
                                <div className={styles.ticketHeader}>
                                    Loại vé: {item.name}
                                </div>
                                <div className={styles.ticketPrice}>
                                    <div>Giá vé: {item.price.toLocaleString('vi-VN')} đ</div>
                                    <div>Số lượng: {item.amount}</div>
                                    <div>Thành tiền: {(item.price * item.amount).toLocaleString('vi-VN')} đ</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.orderInfo}>
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

            <div className={styles.buttonGroup}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>Quay lại</button>
                <button className={styles.submitBtn} onClick={() => handlePaying()} >Thanh toán</button>
            </div>
        </div>
    );
}

export default Paying;