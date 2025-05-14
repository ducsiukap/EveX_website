import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { findCEById } from "../../controllers/CommunityEventDAO";
import ViewCEForm from "../ViewCEForm";
import styles from './ViewCE.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';


function ViewCE({ user }) {
    const { id } = useParams();
    const [event, setEvent] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchData = () => {
            const response = findCEById(id);
            // console.log('view - ', response);
            setEvent(response);
            setLoading(false);
        }

        fetchData();
    }, [id])

    if (loading) return <h3 className={styles.loading}>Loading....</h3>
    if (!event || event.org.id !== user.id) return <Navigate to={`/my-events/view/`} />

    return (
        <div className={styles.container}>
            <ViewCEForm event={event} />

            {event.ticketTypes && event.ticketTypes.length > 0 && (
                <section className={styles.ticketsSection}>
                    <header className={styles.sectionHeader}>
                        <FontAwesomeIcon icon={faTicket} className={styles.headerIcon} />
                        <h3>Danh sách vé</h3>
                    </header>

                    <main className={styles.tableWrapper}>
                        <table className={styles.ticketTable}>
                            <thead>
                                <tr>
                                    <th>Tên vé</th>
                                    <th>Giá vé</th>
                                    <th>Số lượng</th>
                                    <th>Số vé đã bán</th>
                                </tr>
                            </thead>
                            <tbody>
                                {event.ticketTypes.map((ticket, index) => (
                                    <tr key={index}>
                                        <td>{ticket.name}</td>
                                        <td>{ticket.price.toLocaleString('vi-VN')} VNĐ</td>
                                        <td>{ticket.quantity}</td>
                                        <td>{ticket.soldAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </section>
            )}

            <div className={styles.buttonGroup}>
                <button
                    className={styles.backButton}
                    onClick={() => navigate(`/my-events/view`)}
                >
                    Quay lại
                </button>
                <button
                    className={styles.editButton}
                    onClick={() => navigate(`/my-events/modify/${id}`)}
                >
                    Sửa sự kiện
                </button>
            </div>
        </div>
    );
}

export default ViewCE;