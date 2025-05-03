import { useState } from "react"
import User from "../../models/User";
import { updateUser } from '../../controllers/UserDAO.js'
import './style.css';
import { useNavigate } from "react-router-dom";

function ChangePW({ user, onSave }) {
    const [pw, setPw] = useState('');
    const [nPw, setNPw] = useState('');
    const [cfpw, setcfpw] = useState('');
    const [pwErr, setPwErr] = useState('');
    const [cfErr, setCfErr] = useState('');
    const [npwErr, setNpwErr] = useState('');

    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault()
        const u = user;
        u.password = nPw;
        if (updateUser(u)) {
            onSave(u);
            alert('Đổi mật khẩu thành công!');
            navigate('/profile', { replace: true });
        }
    }

    return (
        <form className="account-form" onSubmit={(e) => handleSave(e)}>
            <div className="form-group">
                <label htmlFor="oldPW">Mật khẩu cũ: </label>
                <input
                    type="password"
                    id="oldPW"
                    required
                    onChange={(e) => setPw(e.target.value)}
                    onBlur={() => setPwErr(pw === user.password ? '' : 'Mật khẩu cũ không đúng!')}
                />
                <label className="error">{pwErr}</label>
            </div>
            <div className="form-group">
                <label htmlFor="newPW">Mật khẩu mới: </label>
                <input
                    type="password"
                    id="newPW"
                    required
                    onChange={(e) => setNPw(e.target.value)}
                    onBlur={() => setNpwErr(nPw === pw ? 'Mật khẩu mới không hợp lệ' : '')}
                />
                <label className="error">{npwErr}</label>
            </div>
            <div className="form-group">
                <label htmlFor="re-pw">Nhập lại mật khẩu: </label>
                <input
                    type="password"
                    id="re-pw"
                    required
                    onChange={(e) => setcfpw(e.target.value)}
                    onBlur={() => setCfErr(cfpw === nPw ? '' : 'Mật khẩu không trùng khớp')}
                />
                <label className="error">{cfErr}</label>
            </div>

            <button type="submit" className="submit-btn"
                disabled={cfErr && pw && nPw}>Lưu thay đổi</button>
        </form>

    )
}

export default ChangePW;