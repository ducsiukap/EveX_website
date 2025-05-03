import { useState } from "react"
import { useNavigate } from "react-router-dom";
import User from "../../models/User";
import { updateUser } from '../../controllers/UserDAO.js'
import './style.css';

function AccountMng({ user, onSave }) {
    const navigate = useNavigate();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [error, setError] = useState('');

    const handleSave = (e) => {
        e.preventDefault()
        const u = new User(name, email, user.password, phone, user.status, user.role);
        u.id = user.id;
        if (updateUser(u)) { 
            onSave(u);
        } else {
            setError('Email đã tồn tại!');
        }
    }

    return (
        <form className="account-form" onSubmit={(e) => handleSave(e)}>
            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => setError('')}
                />
                <label className="error">{error}</label>
            </div>
            <div className="form-group">
                <label>Password: </label>
                <input
                    type="password"
                    value="***********"
                    required
                    readOnly
                />
                <button
                    type="button"
                    className="change-password-btn"
                    onClick={() => navigate('/profile/changepw')}
                >
                    Đổi mật khẩu
                </button>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Tel: </label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <button type="submit" className="submit-btn"
                disabled={name === user.name && phone === user.phone && email === user.email}>Lưu thay đổi</button>
        </form>

    )
}

export default AccountMng;