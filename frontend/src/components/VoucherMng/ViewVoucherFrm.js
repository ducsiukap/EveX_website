import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVoucherById } from "../../controllers/VoucherDAO";
import './style.css'
function ViewVoucher() {
    const { vid } = useParams();
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState(null);

    useEffect(() => {
        const found = getVoucherById(Number(vid));
        if (found) {
            setVoucher(found);
        } else {
            alert("Voucher không tồn tại!");
            navigate("/vouchers");
        }
    }, [vid, navigate]);

    if (!voucher) return <p>Đang tải...</p>;

    return (
        <div className="view-voucher">
            <h2 className="view-voucher-title">Chi tiết Voucher</h2>
            <ul className="view-voucher-list">
                <li><strong>Mã:</strong> {voucher.code}</li>
                <li><strong>Mô tả:</strong> {voucher.description}</li>
                <li><strong>Loại:</strong> {voucher.type === 'percent' ? 'Phần trăm' : 'Cố định'}</li>
                <li><strong>Giá trị:</strong> {voucher.type === 'percent' ? `${voucher.value}%` : `${voucher.value.toLocaleString()} VNĐ`}</li>
                <li><strong>Số lượng:</strong> {voucher.quantity}</li>
                <li><strong>Bắt đầu:</strong> {new Date(voucher.sT).toLocaleString()}</li>
                <li><strong>Kết thúc:</strong> {new Date(voucher.eT).toLocaleString()}</li>
                <li><strong>Trạng thái:</strong> {voucher.status}</li>
            </ul>
            <button className="btn-back" onClick={() => navigate("/vouchers")}>Quay lại danh sách</button>
        </div>
    );
}

export default ViewVoucher;
