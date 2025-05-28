import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../controllers/UserDAO";
import { useForm } from 'react-hook-form';
import './EditUser.css'; // Đã đổi sang CSS riêng

function EditUser() {
    const { uid } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        setError(false);
        const fetchData = () => {
            const data = getUserById(uid);
            if (!data) setError(true);
            else {
                setUser(data);
                reset({ name: data.name });
            }
        }
        fetchData();
        setLoading(false);
    }, [uid, reset]);

    if (error) return <Navigate to='/users' replace />;
    if (loading) return <div className="edit-user-container">Đang tải...</div>;

    const handleSave = (data) => {
        const updatedUser = user;
        updatedUser.name = data.name;

        if (updateUser(updatedUser)) {
            alert("Chỉnh sửa thông tin người dùng thành công");
            navigate('/users');
        } else {
            alert('Lỗi rồi cha');
        }
    }

    return (
        <div className="edit-user-container">
            <h2 className="edit-user-title">Chỉnh sửa người dùng</h2>
            <form onSubmit={handleSubmit(handleSave)} className="edit-user-form">
                <div className="edit-user-group">
                    <label htmlFor="name" className="edit-user-label">Tên:</label>
                    <input
                        id="name"
                        className="edit-user-input"
                        {
                        ...register('name', {
                            required: "Không được bỏ trống",
                        })}
                        onChange={(e) => {
                            const val = e.target.value.trimStart();
                            setValue("name", val, { shouldValidate: true });
                        }}
                    />
                    {errors.name && <p className="edit-user-error">{errors.name.message}</p>}
                </div>

                <div className="edit-user-group">
                    <label className="edit-user-label">Email:</label>
                    <input value={user.email} readOnly className="edit-user-input" />
                </div>

                <div className="edit-user-group">
                    <label className="edit-user-label">Password:</label>
                    <input type="password" value={user.password} readOnly className="edit-user-input" />
                </div>

                <div className="edit-user-group">
                    <label className="edit-user-label">Tel:</label>
                    <input value={user.phone} readOnly className="edit-user-input" />
                </div>

                <div className="edit-user-group">
                    <label className="edit-user-label">Status:</label>
                    <input value={user.status} readOnly className="edit-user-input" />
                </div>

                <div className="edit-user-group">
                    <label className="edit-user-label">Role:</label>
                    <input
                        value={user.role === 'O' ? "Tổ chức" : "Cá nhân"}
                        readOnly
                        className="edit-user-input"
                    />
                </div>

                <button
                    type="submit"
                    disabled={errors.name || getValues('name') === user.name}
                    className="edit-user-button"
                >
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
}

export default EditUser;
