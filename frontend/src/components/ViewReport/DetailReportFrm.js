import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faExclamationTriangle, 
    faTrash, 
    faArrowLeft, 
    faUser 
} from '@fortawesome/free-solid-svg-icons';
import ViewEventForm from '../ViewEvent';
import { resolvedReport } from '../../controllers/ReportDAO';
import { banCE } from '../../controllers/CommunityEventDAO';
import './DetailReport.css';

function DetailReport() {
    const location = useLocation();
    const navigate = useNavigate();

    if (!location.state) return <Navigate to='/reports' replace />;
    const { event, reports } = location.state;

    const handleDeleteEvent = () => {
        reports.forEach((report) => resolvedReport(report.id));
        banCE(event.id);
        navigate('/reports');
    };

    const handleGoBack = () => {
        reports.forEach((report) => resolvedReport(report.id));
        navigate('/reports');
    };

    return (
        <div className="detail-report-container">
            <div className="detail-report-header">
                <h2>
                    <FontAwesomeIcon icon={faExclamationTriangle} className="header-icon" />
                    Chi tiết báo cáo sự kiện
                </h2>
            </div>

            <ViewEventForm event={event} />

            <div className="reports-list">
                <h3>
                    <FontAwesomeIcon icon={faExclamationTriangle} className="section-icon" />
                    Danh sách báo cáo
                </h3>
                <ul>
                    {reports.map((report, index) => (
                        <li key={index} className="report-item">
                            <div className="report-header">
                                <span className="report-number">Báo cáo #{index + 1}</span>
                                <div className="reporter-info">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>{report.user.name}</span>
                                </div>
                            </div>
                            <div className="report-content">
                                {report.reason}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="action-buttons">
                <button 
                    onClick={handleGoBack} 
                    className="btn-cancel"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Bỏ qua
                </button>
                <button 
                    onClick={handleDeleteEvent} 
                    className="btn-delete"
                >
                    <FontAwesomeIcon icon={faTrash} />
                    Xóa sự kiện
                </button>
            </div>
        </div>
    );
}

export default DetailReport;