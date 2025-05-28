import { useEffect, useState } from "react";
import { findCEByName } from "../../controllers/CommunityEventDAO";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarDay, faCalendarAlt, faHistory } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import styles from './CEMng.module.css';

function CEMng({ user }) {
    const [events, setEvents] = useState({ today: [], future: [], past: [] });
    const [key, setKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const data = findCEByName('', user.id);
        setEvents(data ? filterEvents(data) : []);
    }, [user.id]);

    const filterEvents = (eventList) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const filtered = {
            today: [],
            future: [],
            past: []
        };
        eventList.forEach(event => {
            const eventStartDate = new Date(event.startTime).setHours(0, 0, 0, 0);
            const eventEndDate = event.endTime ? new Date(event.endTime).setHours(0, 0, 0, 0) : '';

            if (eventStartDate > today) filtered.future.push(event);
            else if (eventEndDate && eventEndDate < today) filtered.past.push(event);
            else filtered.today.push(event);
        })
        return filtered;
    };

    const handleSearch = () => {
        const data = findCEByName(key, user.id);
        setEvents(data ? filterEvents(data) : []);
    }

    return (
        <div className={styles.peManager}>
            <section className={styles.searchSection}>
                <main className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sự kiện..."
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </main>
            </section>

            <section className={styles.eventsSection}>
                <section className={styles.eventCategory}>
                    <header className={styles.categoryHeader}>
                        <FontAwesomeIcon icon={faCalendarDay} />
                        <span>Sự kiện hôm nay</span>
                        <span className={styles.eventCount}>{events.today.length}</span>
                    </header>
                    <main className={styles.eventList}>
                        {events.today.length > 0 ? (
                            <table className={styles.eventTable}>
                                <thead>
                                    <tr>
                                        <th>Thời gian</th>
                                        <th>Tên sự kiện</th>
                                        <th>Địa điểm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.today.map(event => (
                                        <tr
                                            key={event.id}
                                            className={styles.eventRow}
                                            onClick={() => navigate(`/my-events/view/${event.id}`)}
                                        >
                                            <td>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{event.title}</td>
                                            <td>{event.location || 'Không có địa điểm'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noEvents}>Không có sự kiện nào</p>
                        )}
                    </main>
                </section>

                <section className={styles.eventCategory}>
                    <header className={styles.categoryHeader}>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span>Sự kiện sắp tới</span>
                        <span className={styles.eventCount}>{events.future.length}</span>
                    </header>
                    <main className={styles.eventList}>
                        {events.future.length > 0 ? (
                            <table className={styles.eventTable}>
                                <thead>
                                    <tr>
                                        <th>Ngày</th>
                                        <th>Thời gian</th>
                                        <th>Tên sự kiện</th>
                                        <th>Địa điểm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.future.map(event => (
                                        <tr
                                            key={event.id}
                                            className={styles.eventRow}
                                            onClick={() => navigate(`/my-events/view/${event.id}`)}
                                        >
                                            <td>{new Date(event.startTime).toLocaleDateString()}</td>
                                            <td>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{event.title}</td>
                                            <td>{event.location || 'Không có địa điểm'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noEvents}>Không có sự kiện nào</p>
                        )}
                    </main>
                </section>

                <section className={styles.eventCategory}>
                    <header className={styles.categoryHeader}>
                        <FontAwesomeIcon icon={faHistory} />
                        <span>Sự kiện đã diễn ra</span>
                        <span className={styles.eventCount}>{events.past.length}</span>
                    </header>
                    <main className={styles.eventList}>
                        {events.past.length > 0 ? (
                            <table className={styles.eventTable}>
                                <thead>
                                    <tr>
                                        <th>Ngày</th>
                                        <th>Thời gian</th>
                                        <th>Tên sự kiện</th>
                                        <th>Địa điểm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.past.map(event => (
                                        <tr
                                            key={event.id}
                                            className={styles.eventRow}
                                            onClick={() => navigate(`/my-events/view/${event.id}`)}
                                        >
                                            <td>{new Date(event.startTime).toLocaleDateString()}</td>
                                            <td>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{event.title}</td>
                                            <td>{event.location || 'Không có địa điểm'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noEvents}>Không có sự kiện nào</p>
                        )}
                    </main>
                </section>
            </section>
        </div>
    );
}

export default CEMng;