import { faCalendarPlus, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from './CEMainUI.module.css';

function CEMngMainUI() {
    const menuItems = [
        {
            path: '/my-events/create',
            icon: faCalendarPlus,
            title: 'Thêm sự kiện mới'
        },
        {
            path: '/my-events/view',
            icon: faCalendarCheck,
            title: 'Quản lý sự kiện'
        }
    ];

    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeActions}>
                {menuItems.map((item, index) => (
                    <Link
                        to={item.path}
                        className={styles.homeCard}
                        key={index}
                    >
                        <div className={styles.cardIcon}>
                            <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <div className={styles.cardContent}>
                            <h3>{item.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CEMngMainUI;