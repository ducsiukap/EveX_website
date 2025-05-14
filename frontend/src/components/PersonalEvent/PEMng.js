import { useEffect, useState } from "react";
import { findPEByUserId, findPEByName } from "../../controllers/PersonalEventDAO";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarDay, faCalendarAlt, faHistory } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import './PEMng.css';

function PEMng({ user }) {
    const [events, setEvents] = useState({ today: [], future: [], past: [] });
    const [key, setKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const data = findPEByUserId(user.id);
        setEvents(data ? filterEvents(data) : []);
        // console.log(filterEvents(data));
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
            else if (eventEndDate && eventEndDate < today) filtered.today.push(event);
            else filtered.past.push(event);
        })
        return filtered;
    };

    const handleSearch = () => {
        const data = findPEByName(key, user.id);
        setEvents(data ? filterEvents(data) : []);
        // console.log(filterEvents(data));
    }

    return (
        <div className="pe-manager">
            <div className="search-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sự kiện..."
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>

            <div className="events-section">
                <div className="event-category">
                    <h3>
                        <FontAwesomeIcon icon={faCalendarDay} />
                        <span>Sự kiện hôm nay</span>
                        <span className="event-count">{events.today.length}</span>
                    </h3>
                    <div className="event-list">
                        {events.today.length > 0 ? (
                            <table className="event-table">
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
                                            className="event-row"
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
                            <p className="no-events">Không có sự kiện nào</p>
                        )}
                    </div>
                </div>

                <div className="event-category">
                    <h3>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span>Sự kiện sắp tới</span>
                        <span className="event-count">{events.future.length}</span>
                    </h3>
                    <div className="event-list">
                        {events.future.length > 0 ? (
                            <table className="event-table">
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
                                            className="event-row"
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
                            <p className="no-events">Không có sự kiện nào</p>
                        )}
                    </div>
                </div>

                <div className="event-category">
                    <h3>
                        <FontAwesomeIcon icon={faHistory} />
                        <span>Sự kiện đã diễn ra</span>
                        <span className="event-count">{events.past.length}</span>
                    </h3>
                    <div className="event-list">
                        {events.past.length > 0 ? (
                            <table className="event-table">
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
                                            className="event-row"
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
                            <p className="no-events">Không có sự kiện nào</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PEMng;