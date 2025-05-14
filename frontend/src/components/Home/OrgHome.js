import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faUser,
    faCalendarCheck,
    faChartBar,
    faQrcode
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const menuItems = [
    {
        path: '/profile',
        icon: faUser,
        title: 'Quản lý tài khoản',
        description: 'Xem và cập nhật thông tin tài khoản tổ chức'
    },
    {
        path: '/my-events',
        icon: faCalendarCheck,
        title: 'Quản lý sự kiện',
        description: 'Tạo, chỉnh sửa và theo dõi sự kiện cộng đồng'
    },
    {
        path: '/statistics',
        icon: faChartBar,
        title: 'Thống kê',
        description: 'Xem dữ liệu người tham gia và doanh thu sự kiện'
    },
    {
        path: '/verification',
        icon: faQrcode,
        title: 'Xác thực',
        description: 'Nhập mã để xác nhận người tham dự sự kiện'
    }
];

function OrgHome() {
    return (
        <div className="home-container">
            <h2 className="home-title">
                <FontAwesomeIcon icon={faBuilding} className="welcome-icon" />
                Trang tổ chức
            </h2>
            <div className="home-actions">
                {menuItems.map((item, index) => (
                    <Link 
                        to={item.path} 
                        className="home-card" 
                        key={index}
                    >
                        <div className="card-icon">
                            <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <div className="card-content">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default OrgHome;