import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function AdminHome() {
    return (
        <div className="home-container">
            <h2>🛠️ Trang quản trị hệ thống</h2>
            <div className="home-actions">
                <Link to="/manage-users" className="home-card">
                    <h3>👥 Quản lý người dùng</h3>
                    <p>Kiểm soát tài khoản cá nhân và tổ chức.</p>
                </Link>
                <Link to="/reported-events" className="home-card">
                    <h3>🚨 Sự kiện bị báo cáo</h3>
                    <p>Xử lý các sự kiện vi phạm.</p>
                </Link>
                <Link to="/manage-vouchers" className="home-card">
                    <h3>🎁 Quản lý voucher</h3>
                    <p>Tạo và phân phối mã giảm giá.</p>
                </Link>
            </div>
        </div>
    );
}

export default AdminHome;
