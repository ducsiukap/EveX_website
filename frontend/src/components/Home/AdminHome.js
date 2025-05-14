import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTools,
    faUsers,
    faFlag,
    faTicket
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const menuItems = [
    {
        path: '/users',
        icon: faUsers,
        title: 'Quản lý người dùng',
        description: 'Kiểm soát tài khoản cá nhân và tổ chức'
    },
    {
        path: '/reports',
        icon: faFlag,
        title: 'Sự kiện bị báo cáo',
        description: 'Xử lý các sự kiện vi phạm'
    },
    {
        path: '/vouchers',
        icon: faTicket,
        title: 'Quản lý voucher',
        description: 'Tạo và phân phối mã giảm giá'
    }
];

function AdminHome() {
    return (
        <div className="home-container">
            <h2 className="home-title">
                <FontAwesomeIcon icon={faTools} className="welcome-icon" />
                Trang quản trị hệ thống
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

export default AdminHome;