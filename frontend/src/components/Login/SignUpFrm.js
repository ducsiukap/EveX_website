import React, { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { addUser } from '../../controllers/UserDAO';
import User from '../../models/User';
import styles from './SignUp.module.css'

function SignUp({ isLoggedIn, onSubmit }) {
    const email = useRef('');
    const password = useRef('');
    const phone = useRef('');
    const name = useRef('');
    const [role, setRole] = useState('P');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    if (isLoggedIn) return <Navigate to="/home" replace />;

    const handleSignUp = (e) => {
        e.preventDefault();
        const u = new User(name.current.value, email.current.value, password.current.value, phone.current.value, null, role);
        if (addUser(u)) {
            onSubmit(u);
            navigate('/home', { replace: true });
        } else {
            setError('Email đã tồn tại');
        }
    };

    return (
        <form onSubmit={handleSignUp} className={styles.signupForm}>
            <h1 className={styles.title}>Đăng ký</h1>

            <div className={styles.inputGroup}>
                <label htmlFor="name">Họ tên:</label>
                <input
                    type="text"
                    id="name"
                    ref={name}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    ref={email}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password">Mật khẩu:</label>
                <input
                    type="password"
                    id="password"
                    ref={password}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="tel">Số điện thoại:</label>
                <input
                    type="tel"
                    id="tel"
                    ref={phone}
                    required
                />
            </div>

            <div className={styles.radioGroup}>
                <label>Vai trò:</label>
                <label className={styles.radioLabel}>
                    <input
                        type="radio"
                        name="role"
                        value="P"
                        checked={role === 'P'}
                        onChange={(e) => setRole('P')}
                    />
                    Cá nhân
                </label>
                <label className={styles.radioLabel}>
                    <input
                        type="radio"
                        name="role"
                        value="O"
                        checked={role === 'O'}
                        onChange={(e) => setRole('O')}
                    />
                    Tổ chức
                </label>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button type="submit" className={styles.submitButton}>
                Đăng ký
            </button>

            <div className={styles.loginLink}>
                Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </div>
        </form >
    );
}

export default SignUp;
