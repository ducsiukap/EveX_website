import { useForm } from "react-hook-form";
import { updateUser } from '../../controllers/UserDAO.js';
import './style.css';
import { useNavigate } from "react-router-dom";

function ChangePW({ user, onSave }) {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleSave = (data) => {
        if (data.newPW === data.oldPW) {
            setError("newPW", { type: "manual", message: "Mật khẩu mới không hợp lệ" });
            return;
        }

        if (data.newPW !== data.confirmPW) {
            setError("confirmPW", { type: "manual", message: "Mật khẩu không trùng khớp" });
            return;
        }

        if (data.oldPW !== user.password) {
            setError("oldPW", { type: "manual", message: "Mật khẩu cũ không đúng!" });
            return;
        }

        const updatedUser = { ...user.toJSON(), password: data.newPW };
        if (updateUser(updatedUser)) {
            onSave(updatedUser);
            alert('Đổi mật khẩu thành công!');
            navigate('/profile', { replace: true });
        }
    };

    return (
        <div className="container">
            <h3 className="page-title">Đổi mật khẩu</h3>
            <form className="account-form" onSubmit={handleSubmit(handleSave)}>
                <div className="form-group">
                    <label htmlFor="oldPW">Mật khẩu cũ: </label>
                    <input
                        type="password"
                        id="oldPW"
                        {...register("oldPW", { required: "Vui lòng nhập mật khẩu cũ" })}
                        onBlur={() => clearErrors("oldPW")}
                    />
                    {errors.oldPW && <label className="error">{errors.oldPW.message}</label>}
                </div>
                <div className="form-group">
                    <label htmlFor="newPW">Mật khẩu mới: </label>
                    <input
                        type="password"
                        id="newPW"
                        {...register("newPW", { required: "Vui lòng nhập mật khẩu mới" })}
                        onBlur={() => clearErrors("newPW")}
                    />
                    {errors.newPW && <label className="error">{errors.newPW.message}</label>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPW">Nhập lại mật khẩu: </label>
                    <input
                        type="password"
                        id="confirmPW"
                        {...register("confirmPW", { required: "Vui lòng nhập lại mật khẩu" })}
                        onBlur={() => clearErrors("confirmPW")}
                    />
                    {errors.confirmPW && <label className="error">{errors.confirmPW.message}</label>}
                </div>

                <button type="submit" className="submit-btn">Lưu thay đổi</button>
            </form>
        </div>
    );
}

export default ChangePW;
