import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function PersonalHome() {
    return (
        <div className="home-container">
            <h2>👋 Chào mừng bạn đến với EveX</h2>
            <div className="home-actions">
                <Link to="/profile" className="home-card">
                    <h3>👤 Quản lý tài khoản</h3>
                    <p>Quản lý thông tin tài khoản</p>
                </Link>
                <Link to="/my-events" className="home-card">
                    <h3>📅 Sự kiện cá nhân</h3>
                    <p>Tạo và quản lý các sự kiện riêng của bạn.</p>
                </Link>
                <Link to="/explore" className="home-card">
                    <h3>🔍 Tìm sự kiện</h3>
                    <p>Khám phá các sự kiện cộng đồng hấp dẫn.</p>
                </Link>
                <Link to="/my-tickets" className="home-card">
                    <h3>🎟️ Vé đã mua</h3>
                    <p>Xem danh sách vé sự kiện bạn đã mua.</p>
                </Link>
            </div>
        </div>
    );
}

export default PersonalHome;