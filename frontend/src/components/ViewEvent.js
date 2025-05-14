import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faMapMarkerAlt,
    faClock,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import styles from './ViewEvent.module.css';

function ViewEventForm({ event }) {
    const startTime = event.startTime ? new Date(event.startTime).toLocaleString() : 'Không có thời gian bắt đầu.';
    const endTime = event.endTime ? new Date(event.endTime).toLocaleString() : 'Không có thời gian kết thúc.';

    return (
        <div className={styles.viewContainer}>
            <h2 className={styles.eventTitle}>{event.title}</h2>

            <div className={styles.eventDetails}>
                <div className={styles.detailItem}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                        <label>Địa điểm</label>
                        <span>{event.location ? event.location : 'Không có địa điểm!'}</span>
                    </div>
                </div>

                <div className={`${styles.detailItem} ${styles.timeGroup}`}>
                    <div className={styles.detailContent}>
                        <FontAwesomeIcon icon={faCalendarAlt} className={styles.detailIcon} />
                        <div className={styles.detailContent}>
                            <label>Thời gian bắt đầu</label>
                            <span>{startTime}</span>
                        </div>
                    </div>
                    <div className={styles.detailContent}>
                        <FontAwesomeIcon icon={faClock} className={styles.detailIcon} />
                        <div className={styles.detailContent}>
                            <label>Thời gian kết thúc</label>
                            <span>{endTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.eventDescription}>
                <div className={styles.detailItem}>
                    <FontAwesomeIcon icon={faInfoCircle} className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                        <label>Mô tả sự kiện</label>
                        <p>{event.description ? event.description : 'Không có mô tả'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewEventForm;