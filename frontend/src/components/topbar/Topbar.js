import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Topbar({ user, onLogout }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        setShowDropdown(false);
        onLogout(null);
    }

    return (
        <div className="topbar-container">
            <div className="logo">
                <Link to="/home">EveX</Link>
            </div>

            <div className="nav-links">
                <Link to="/home"><i class="fa-solid fa-house"></i>&nbsp;Trang chủ</Link>
                {user ? (
                    user.role === 'A' ? (
                        <Link to="/login" onClick={handleLogout}>Đăng xuất</Link>
                    ) : (
                        <div
                            className={`user-menu ${showDropdown ? 'active' : ''}`}
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <span className="user-name">
                                <i className="fas fa-user"></i>&nbsp;
                                {user.name}</span>
                            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                                <Link to="/profile">
                                    <i className="fas fa-user"></i>
                                    Trang cá nhân
                                </Link>
                                <hr />
                                <Link to="/login" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    Đăng xuất
                                </Link>
                            </div>
                        </div>
                    )
                ) : (
                    <>
                        <Link to="/login">Đăng nhập</Link>
                        <Link to="/signup">Đăng ký</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Topbar;