import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { findOnePublicCE } from "../../controllers/CommunityEventDAO";
import { findAllVoucher } from "../../controllers/VoucherDAO";
import { addReport } from "../../controllers/ReportDAO";
import ViewCEForm from "../ViewCEForm";
import { useForm } from "react-hook-form";

import styles from './DetailEvent.module.css';

function DetailEvent({ user }) {
    const [event, setEvent] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const [vouchers, setVouchers] = useState();
    const [showPopup, setShowPopup] = useState(false)
    const [reportError, setReportError] = useState();
    const report = useRef();

    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

    useEffect(() => {
        const data = findOnePublicCE(id);
        if (!data) navigate(`/explore`);

        const vcs = findAllVoucher(true);
        setVouchers(vcs);
        // console.log(vcs);
        setEvent(data);
    }, [id, navigate]);

    const isInProgress = () => {
        const now = new Date();
        const eventEndDate = new Date(event.endTime);
        return (now <= eventEndDate);
    }


    const handleBooking = (data) => {
        if (!Object.values(data).find(value => {
            const number = Number(value);
            return (!isNaN(number) && number > 0);
        })) {
            setError('noTicketSelected', {
                type: 'manual',
                message: 'Vui lòng chọn ít nhất 1 vé để thanh toán'
            })
            return;
        }

        navigate(`/explore/${id}/paying`, {
            state: {
                event: event.toJSON(),
                bookingData: data,
                voucher: (data.voucher ? vouchers.find(item => item.id === Number(data.voucher)).toJSON() : null)
            }
        })
    }

    const handleReport = () => {
        if (!report.current.value) {
            setReportError('Vui lòng nhập lý do!');
        } else {
            // console.log(report.current.value);
            const data = {
                eventId: event.id,
                userId: user.id,
                reason: report.current.value
            }

            addReport({ body: data });
            alert('Gửi báo cáo thành công!')
            resetPopup();
            setShowPopup(false);
        }
    }

    const resetPopup = () => {
        setReportError('');
        report.current.value = '';
    }

    if (!event) return <p className={styles.loadingState}>Loading...</p>

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div><ViewCEForm event={event} /></div>

                {isInProgress() && event.isFree === 0 &&
                    <form onSubmit={handleSubmit(handleBooking)} className={styles.ticketForm}>
                        {event.ticketTypes.map(ticket =>
                            <div key={ticket.id} className={styles.ticketCard}>
                                <div className={styles.ticketHeader}>
                                    <span className={styles.ticketName}>{ticket.name}</span>
                                    <span className={styles.ticketPrice}>
                                        {ticket.price.toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                                <div className={styles.ticketDetails}>
                                    <span>Số lượng còn lại {ticket.quantity - ticket.soldAmount}</span>
                                    <div className={styles.quantityInput}>
                                        <div>
                                            <label>Số lượng: </label>
                                            <input
                                                type="number"
                                                {...register(`${ticket.id}`, {
                                                    max: {
                                                        value: ticket.quantity - ticket.soldAmount,
                                                        message: 'Số lượng vé không hợp lệ!'
                                                    },
                                                    min: {
                                                        value: 0,
                                                        message: 'Số lượng vé không hợp lệ!'
                                                    }
                                                })}
                                                onChange={() => clearErrors('noTicketSelected')}
                                            />
                                        </div>
                                        {errors[ticket.id] &&
                                            <div className={styles.error}>{errors[ticket.id].message}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                        <select {...register('voucher')} className={styles.selectVoucher}>
                            <option value={''}>Chọn Voucher</option>
                            {vouchers.map((voucher) =>
                                <option key={voucher.id} value={voucher.id}>
                                    {`${voucher.code} - ${voucher.description} - Giảm ${voucher.type === 'percent' ? `${voucher.value}%` : `${voucher.value.toLocaleString('vi-VN')}đ`
                                        }`}
                                </option>
                            )}
                        </select>
                        <div className={styles.error}>{errors.noTicketSelected && errors.noTicketSelected.message}</div>
                        <button type="submit" className={styles.submitButton}>Thanh toán</button>
                    </form>
                }
            </div>
            <div className={event.isFree ? styles.buttonGroupCenter : styles.buttonGroup}>
                <button onClick={() => navigate(-1)} className={styles.backButton}>Quay lại</button>
                <button onClick={() => setShowPopup(true)} className={styles.reportButton}>Báo cáo sự kiện</button>
            </div>
            {showPopup && <div className={styles.overlay}></div>}
            {showPopup && <div className={styles.popupDialog}>
                <div className={styles.inputGroup}>
                    <label htmlFor="report-reason">Nhập lý do báo cáo: </label>
                    <textarea
                        id="report-reason"
                        ref={report}
                        onChange={() => setReportError('')}
                        className={styles.reportReason}
                    />
                    {reportError && <span className={styles.error}>{reportError}</span>}
                </div>
                <div className={styles.buttonGroupCenter}>
                    <button className={styles.backButton} onClick={() => { setShowPopup(false); resetPopup(); }}>Hủy</button>
                    <button className={styles.reportButton} onClick={() => handleReport()}>Gửi báo cáo</button>
                </div>
            </div>}
        </div>
    );
}

export default DetailEvent;