import React, { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { addUser } from '../../controllers/UserDAO';
import User from '../../models/User';
import './style.css';

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
        <form onSubmit={handleSignUp} className='register-form'>
            <label className='title'>Sign up</label>
            <div className='input'>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    ref={name}
                    required
                />
            </div>
            <div className='input'>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    ref={email}
                    required
                />
            </div>
            <div className='input'>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    ref={password}
                    required
                />
            </div>
            <div className='input'>
                <label htmlFor="tel">Telephone:</label>
                <input
                    type="tel"
                    id="tel"
                    ref={phone}
                    required
                />
            </div>
            <div className='input'>
                <label>Role:</label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="P"
                        checked={role==='P'}
                        onChange={(e) => setRole('P')}
                    />
                    Cá nhân
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="O"
                        checked = {role === 'O'}
                        onChange={(e) => setRole('O')}
                    />
                    Tổ chức
                </label>
            </div>
            {error && <span className='error-msg'>{error}<br /></span>}
            <button type="submit">Sign Up</button>
            <span className='error-msg'><br />Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link><br /></span>
        </form>
    );
}

export default SignUp;
