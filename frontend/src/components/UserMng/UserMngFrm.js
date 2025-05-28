import React, { useEffect, useState } from 'react';
import { searchByName, updateUser } from '../../controllers/UserDAO';
import { useNavigate } from 'react-router-dom';

import './UserMng.css'
function UserMng({ admin }) {
    const [key, setKey] = useState('');
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const data = searchByName('');
        // console.log(data);
        setUsers(data);
    }, [])

    const handleClickUser = (u) => {
        if (u.role === 'A') alert('Không thể sửa thông tin Admin');
        else navigate(`/users/${u.id}`);
    }

    const handleSearch = () => {
        const data = searchByName(key.toLowerCase());
        setUsers(data);
    };

    const handleBan = (u) => {
        if (u.role === 'A') alert('Không thể sửa thông tin Admin');
        else {
            u.status = u.status === 'ban' ? 'active' : 'ban';
            // console.log(updateUser(u));
            if (updateUser(u)) {
                setUsers(users.map(user => user.id === u.id ? u : user));
            }
        }

    }

    return (
        <div className='user-mng'>
            <h3 className="user-mng-title">User Management</h3>

            <div className="user-mng-search">
                <input
                    type="text"
                    placeholder="Nhập tên/email..."
                    value={key}
                    onChange={(e) => setKey(e.target.value.trim())}
                    className="user-mng-input"
                />
                <button onClick={handleSearch} className="user-mng-button">Tìm kiếm</button>
            </div>

            <table className="user-mng-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id} onClick={() => handleClickUser(user)} className="user-mng-row">
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBan(user);
                                        }}
                                        className={`user-mng-ban-button ${user.status === 'ban' ? 'unlock' : 'ban'}`}
                                    >
                                        {user.status === 'ban' ? 'Mở khóa' : 'Khóa'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>Không tìm thấy người dùng</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

};

export default UserMng;