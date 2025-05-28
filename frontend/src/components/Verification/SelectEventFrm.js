

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { findCEbyUserId } from "../../controllers/CommunityEventDAO";
import { useNavigate } from "react-router-dom";

import styles from './SelectEvent.module.css'

function SelectEvent({ user }) {
    const [events, setEvents] = useState()
    // const events = findCEbyUserId(user.id, true);
    // console.log(events);
    const navigate = useNavigate();

    useEffect(() => {
        const data = findCEbyUserId(user.id, true);
        // console.log(data);
        setEvents(data);
    }, [user.id])

    const handleClick = (event) => {
        // console.log(event);
        navigate(`/verification/${event.id}`)
    }

    if (!events) return <p className={styles.loadingState}>Loading...</p>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Danh sách sự kiện hôm nay</h1>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <div key={index}
                        className={styles.eventCard}
                        onClick={() => handleClick(event)}>
                        <div className={styles.eventInfo}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faCalendarDay} />
                            </div>
                            <div className={styles.eventTitle}>{event.title}</div>
                        </div>
                        <div className={styles.eventInfo}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className={styles.eventLocation}>{event.location}</div>
                        </div>
                        <div className={styles.eventInfo}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <div className={styles.eventTime}>
                                <span>{new Date(event.startTime).toLocaleString('vi-VN')}</span>
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                                <span>{new Date(event.endTime).toLocaleString('vi-VN')}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={styles.emptyMessage}>
                    Không có sự kiện diễn ra trong hôm nay!
                </div>
            )}
        </div>
    );
}

export default SelectEvent;