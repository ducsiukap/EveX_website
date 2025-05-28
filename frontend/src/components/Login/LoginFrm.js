import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { checkLogin } from '../../controllers/UserDAO';
import User from '../../models/User';
import styles from './Login.module.css';

function Login({ isLoggedIn, onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    if (isLoggedIn) return <Navigate to="/home" replace />;

    const handleLogin = (e) => {
        e.preventDefault();
        const u = new User(null, email, password, null, null, null);
        if (checkLogin(u)) {
            if (u.status === 'ban') {
                setError('Tài khoản của bạn đã bị cấm!');
            } else {
                onSubmit(u);
                navigate('/home', { replace: true });
            }
        } else {
            setError('Sai thông tin đăng nhập!');
        }
    };

    return (
        <form onSubmit={handleLogin} className={styles.loginForm}>
            <h1 className={styles.title}>Đăng nhập</h1>
            
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password">Mật khẩu:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button type="submit" className={styles.submitButton}>
                Đăng nhập
            </button>

            <div className={styles.signupLink}>
                Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
            </div>
        </form>
    );
}

export default Login;