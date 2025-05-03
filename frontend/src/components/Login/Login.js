import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { checkLogin } from '../../controllers/UserDAO';
import User from '../../models/User';
import './style.css';

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
                console.log(u);
                onSubmit(u);
                navigate('/home', { replace: true });
            }
        } else {
            setError('Sai thông tin đăng nhập!');
        }
    };

    return (
        <form onSubmit={handleLogin} className='login-form'>
            <label className='title'>Login</label>
            <div className='input'>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className='input'>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <span className='error-msg'>{error}<br /></span>}
            <button type="submit">Login</button>
            <span className='error-msg'><br />Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link><br /></span>
        </form>
    );
}

export default Login;
