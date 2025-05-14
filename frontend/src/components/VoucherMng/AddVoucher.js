import { useState } from "react";
import { useForm } from "react-hook-form";
import Voucher from "../../models/Voucher";
import { addVoucher } from "../../controllers/VoucherDAO";
import { useNavigate } from "react-router-dom";
import './style.css'
function AddVoucher() {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            type: 'percent'
        }
    });

    const [codeErr, setCodeErr] = useState(false);

    const handleSave = (data) => {
        const voucher = new Voucher(
            data.code.trim().toUpperCase(),
            data.description.trim(),
            data.type, data.value, data.quantity,
            data.sT, data.eT,
            'active');
        if (addVoucher(voucher)) {
            navigate(`/vouchers/view/${voucher.id}`)
        } else {
            setCodeErr(true);
        }
    }

    return (
        <div className="add-voucher">
            <h3 className="add-voucher-title">Thêm Voucher mới</h3>
            <form onSubmit={handleSubmit(handleSave)} className="add-voucher-form">
                <div className="form-group">
                    <label htmlFor="code">Mã:</label>
                    <input id="code" className="form-input" {...register('code', { required: "Vui lòng nhập mã voucher!" })}
                        onChange={(e) => {
                            const trimmed = e.target.value.trimStart();
                            setValue('code', trimmed);
                        }}
                        onFocus={() => setCodeErr(false)} />
                    {errors.code && <label className="error">{errors.code.message}</label>}
                    {codeErr && <label className="error">Code đã tồn tại</label>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Mô tả:</label>
                    <input id="description" className="form-input"
                        {...register('description')}
                        onChange={(e) => {
                            const trimmed = e.target.value.trimStart();
                            setValue('description', trimmed);
                        }} />
                </div>

                <div className="form-group">
                    <label>
                        <input type="radio" value="percent" {...register("type", { required: "Vui lòng chọn loại giá trị!" })} />
                        Phần trăm (%)
                    </label>
                    <label>
                        <input type="radio" value="fixed" {...register("type")} />
                        Cố định (VNĐ)
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="value">Giá trị</label>
                    <input id="value" className="form-input" type="number"
                        {...register('value', {
                            required: 'Không được bỏ trống',
                            validate: (v) => {
                                const num = Number(v);
                                if (isNaN(num) || num < 0) return "Giá trị không hợp lệ";
                                const t = getValues('type');
                                if (t === 'percent' && num > 100) return "Giá trị không hợp lệ";
                                return true;
                            }
                        })} />
                    {errors.value && <label className="error">{errors.value.message}</label>}
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Số lượng:</label>
                    <input id="quantity" className="form-input" type="number"
                        {...register('quantity', {
                            required: 'Không được bỏ trống!',
                            validate: (v) => Number(v) > 0 || "Số lượng phải > 0"
                        })} />
                    {errors.quantity && <label className="error">{errors.quantity.message}</label>}
                </div>

                <div className="form-group datetime-group">
                    <label htmlFor="st">Bắt đầu:</label>
                    <input id="st" className="form-input" type="datetime-local" {...register('sT', { required: true })} />
                    <label htmlFor="et">Kết thúc:</label>
                    <input id="et" className="form-input" type="datetime-local"
                        {...register('eT', {
                            required: true,
                            validate: (v) => {
                                const st = getValues('sT');
                                if (new Date(st) > new Date(v)) return "Ngày không hợp lệ!";
                                return true;
                            }
                        })} />
                    {errors.eT && <label className="error">{errors.eT.message}</label>}
                </div>

                <button className="btn-submit" type="submit">Thêm</button>
            </form>
        </div>
    );

}

export default AddVoucher;