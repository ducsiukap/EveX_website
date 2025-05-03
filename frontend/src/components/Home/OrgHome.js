import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function OrgHome() {
    return (
        <div className="home-container">
            <h2>🏢 Trang tổ chức</h2>
            <div className="home-actions">
                <Link to="/profile" className="home-card">
                    <h3>👤 Quản lý tài khoản</h3>
                    <p>Xem và cập nhật thông tin tài khoản tổ chức.</p>
                </Link>
                <Link to="/org-events" className="home-card">
                    <h3>📋 Quản lý sự kiện</h3>
                    <p>Tạo, chỉnh sửa và theo dõi sự kiện cộng đồng.</p>
                </Link>
                <Link to="/statistics" className="home-card">
                    <h3>📊 Thống kê</h3>
                    <p>Xem dữ liệu người tham gia và doanh thu sự kiện.</p>
                </Link>
                <Link to="/verification" className="home-card">
                    <h3>✅ Xác thực</h3>
                    <p>Quét mã để xác nhận người tham dự sự kiện.</p>
                </Link>
            </div>
        </div>
    );
}

export default OrgHome;