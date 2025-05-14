import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findAllVoucher, deleteVoucher } from '../../controllers/VoucherDAO';
import './style.css'
// import './ReportedEventMng.css';
function VoucherMng() {
    const [vouchers, setVouchers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const data = findAllVoucher();
        setVouchers(data);
        // console.log('Data', data);
    }, [])

    const handleDel = (voucher) => {
        if (deleteVoucher(voucher)) {
            const data = vouchers.filter(vc => vc.id !== voucher.id)
            // console.log(data);
            setVouchers(data);
        } else {
            alert('Xóa thất bại');
        }
    }

    const dateParse = (value) => {
        const d = new Date(value);
        return d.toLocaleString();
    }

    return (
        <div className='voucher-mng'>
            <h3 className="voucher-mng-title">All Voucher</h3>
            <button onClick={() => navigate('/vouchers/add')}>Thêm Voucher Mới</button>
            <table className="voucher-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Code</th>
                        <th>Mô tả</th>
                        <th>Giá trị</th>
                        <th>Thời gian</th>
                        <th>Số lượng còn lại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {vouchers.length > 0 ? (
                        vouchers.map((voucher, index) => (
                            <tr key={voucher.id} className="voucher-row" onClick={() => navigate(`/vouchers/view/${voucher.id}`)}>
                                <td>{index + 1}</td>
                                <td><b>{voucher.code}</b></td>
                                <td>{voucher.description}</td>
                                <td>{voucher.value + (voucher.type === "fixed" ? " VND" : "%")}</td>
                                <td>{dateParse(voucher.startAt) + " - " + dateParse(voucher.endAt)}</td>
                                <td>{voucher.quantity}</td>
                                <td>
                                    <button className="btn-delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDel(voucher);
                                        }}>
                                        Xóa Voucher
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>Không tìm thấy voucher</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

};

export default VoucherMng;