

import { useEffect, useState } from "react";
import { findCEByName } from "../../controllers/CommunityEventDAO";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faLocationDot, faClock, faMoneyCheckDollar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from './FindEvent.module.css';

function FindEvent({ user }) {
    const [events, setEvents] = useState();
    const { register, handleSubmit, setValue, getValues } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const data = restructure_data(findCEByName(''));
        // console.log(data);
        setEvents(data);
    }, []);

    const handleChange = (e) => {
        setValue('key', e.target.value.trimStart());
    }

    const handleSearch = (data) => {
        const response = restructure_data(findCEByName(data.key));
        setEvents(response);
    }

    const restructure_data = (data) => {
        const result = [];
        for (let i = 0; i < data.length; i += 4) {
            const slice_data = data.slice(i, i + 4);
            result.push(slice_data);
        }
        return result;
    }

    if (!events) return <p className={styles.loadingState}>Loading...</p>

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(handleSearch)} className={styles.searchForm}>
                <label className={styles.searchLabel}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                    <input
                        type="text"
                        className={styles.searchInput}
                        {...register('key')}
                        onChange={(e) => handleChange(e)}
                        placeholder="Bạn tìm gì hôm nay ?"
                    />
                </label>
                <button type="submit" className={styles.searchButton}>Tìm kiếm</button>
            </form>

            {events.length > 0 ? events.map((slice_data, index) =>
                <div key={index} className={styles.eventGrid}>
                    {slice_data.map((event) =>
                        <div key={event.id}
                            className={styles.eventCard}
                            onClick={() => navigate(`/explore/${event.id}`)}>
                            <div className={styles.eventTitle}>{event.title}</div>
                            <div className={styles.divider} />
                            <div className={styles.eventInfo}>
                                <FontAwesomeIcon icon={faUser} className={styles.infoIcon} />
                                <span>{event.org.name}</span>
                            </div>
                            <div className={styles.eventInfo}>
                                <FontAwesomeIcon icon={faLocationDot} className={styles.infoIcon} />
                                <span>{event.location}</span>
                            </div>
                            <div className={styles.eventInfo}>
                                <FontAwesomeIcon icon={faClock} className={styles.infoIcon} />
                                <span>
                                    {new Date(event.startTime).toLocaleDateString('vi-VN')} -
                                    {new Date(event.endTime).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                            <div className={styles.eventInfo}>
                                <FontAwesomeIcon icon={faMoneyCheckDollar} className={styles.infoIcon} />
                                <span>
                                    Từ {event.isFree ? 0 : Math.min(...event.ticketTypes.map(t => t.price))
                                        .toLocaleString('vi-VN')} đ
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.emptyMessage}>
                    Không có sự kiện nào chứa từ khóa "{getValues('key')}"
                </div>
            )}
        </div>
    );
}

export default FindEvent;