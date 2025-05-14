// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faMapMarkerAlt,
    faClock,
    faInfoCircle,
    faLock,
    faTicket,
    faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import styles from './ViewCEForm.module.css';

function ViewCEForm({ event }) {
    const startTime = event.startTime ? new Date(event.startTime).toLocaleString() : 'Không có thời gian bắt đầu.';
    const endTime = event.endTime ? new Date(event.endTime).toLocaleString() : 'Không có thời gian kết thúc.';

    return (
        <div className={styles.viewContainer}>
            <h2 className={styles.viewTitle}>{event.title}</h2>

            <div className={styles.viewContent}>
                <div className={styles.infoGroup}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.infoIcon} />
                    <div className={styles.infoContent}>
                        <label>Địa điểm</label>
                        <span>{event.location || 'Không có địa điểm!'}</span>
                    </div>
                </div>

                <div className={styles.infoGroup}>
                    <FontAwesomeIcon icon={faUserCircle} className={styles.infoIcon} />
                    <div className={styles.infoContent}>
                        <label>Người tạo</label>
                        <span>{event.org.name}</span>
                    </div>
                </div>

                <div className={styles.infoWrapper}>
                    <div className={styles.infoGroup}>
                        <FontAwesomeIcon icon={faCalendarAlt} className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                            <label>Thời gian bắt đầu</label>
                            <span>{startTime}</span>
                        </div>
                    </div>
                    <div className={styles.infoGroup}>
                        <FontAwesomeIcon icon={faClock} className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                            <label>Thời gian kết thúc</label>
                            <span>{endTime}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.infoWrapper}>
                    <div className={styles.infoGroup}>
                        <FontAwesomeIcon icon={faLock} className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                            <label>Trạng thái</label>
                            <span>{event.status === 'private' ? 'Riêng tư' : 'Công khai'}</span>
                        </div>
                    </div>
                    <div className={styles.infoGroup}>
                        <FontAwesomeIcon icon={faTicket} className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                            <label>Loại sự kiện</label>
                            <span>{Number(event.isFree) ? 'Miễn phí' : 'Trả phí'}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.descriptionGroup}>
                    <FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} />
                    <div className={styles.infoContent}>
                        <label>Mô tả sự kiện</label>
                        <p>{event.description || 'Không có mô tả'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCEForm;