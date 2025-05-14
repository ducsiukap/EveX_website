import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import User from "../../models/User";
import { updateUser } from '../../controllers/UserDAO.js'
import './style.css';

function AccountMng({ user, onSave }) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isDirty }, setError: setFormError } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone
        }
    });

    const onSubmit = (data) => {
        const u = new User(data.name, data.email, user.password, data.phone, user.status, user.role);
        u.id = user.id;
        if (updateUser(u)) {
            onSave(u);
        } else {
            setFormError('email', {
                type: 'manual',
                message: 'Email đã tồn tại!'
            });
        }
    }

    return (
        <div className="container" >
            <h3 className="page-title">Quản lý tài khoản</h3>
            <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        value="***********"
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
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Please enter valid phone number"
                            }
                        })}
                    />
                    {errors.phone && <span className="error">{errors.phone.message}</span>}
                </div>

                <button type="submit" className="submit-btn" disabled={!isDirty}>
                    Lưu thay đổi
                </button>
            </form>
        </div>
    )
}

export default AccountMng;