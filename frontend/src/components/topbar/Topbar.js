import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';

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
                <Link to="/home">Trang chủ</Link>
                {user ? (
                    user.role !== 'A' ? <div
                        className="user-menu"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setTimeout(setShowDropdown(false), 1000)}
                    >
                        <span className="user-name">👤 {user.name}</span>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/profile">Trang cá nhân</Link>
                                <Link to="/login" onClick={handleLogout}>Đăng xuất</Link>
                            </div>
                        )}
                    </div> :
                        <Link to="/login" onClick={handleLogout}>Đăng xuất</Link>

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
