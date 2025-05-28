import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faExclamationTriangle, 
    faEye, 
    faBuilding 
} from '@fortawesome/free-solid-svg-icons';
import { findAll } from '../../controllers/ReportDAO';
import './ReportedEventMng.css';

function ReportedEventMng({ admin }) {
    const [reports, setReports] = useState([]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = findAll();
        setReports(data);

        const st = new Set();
        const uniqueEvents = data.reduce((acc, report) => {
            if (!st.has(report.event.id)) {
                st.add(report.event.id);
                acc.push(report.event);
            }
            return acc;
        }, []);

        setEvents(uniqueEvents);
    }, []);
    
    const handleClicEvent = (event) => {
        navigate(`/reports/${event.id}`, {
            state: {
                event: event.toJSON(),
                reports: reports
                    .filter(report => report.event.id === event.id)
                    .map(r => r.toJSON())
            }
        });
    };

    return (
        <div className='report-mng'>
            <h2 className="report-mng-title">
                <FontAwesomeIcon icon={faExclamationTriangle} className="title-icon" />
                Sự kiện bị báo cáo
            </h2>

            <div className="table-container">
                <table className="report-mng-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên sự kiện</th>
                            <th>Tổ chức</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <tr key={event.id}>
                                    <td>{index + 1}</td>
                                    <td>{event.title}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faBuilding} className="org-icon" />
                                        {event.org.name}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${event.status.toLowerCase()}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="view-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClicEvent(event);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="empty-row">
                                <td colSpan="5">
                                    <div className="empty-message">
                                        Không có sự kiện bị báo cáo
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReportedEventMng;