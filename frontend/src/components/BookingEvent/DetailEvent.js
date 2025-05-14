import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { findOnePublicCE } from "../../controllers/CommunityEventDAO";
import { findAllVoucher } from "../../controllers/VoucherDAO";
import ViewCEForm from "../ViewCEForm";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from './DetailEvent.module.css';

function DetailEvent({ user }) {
    const [event, setEvent] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const [vouchers, setVouchers] = useState();

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

    if (!event) return <p className={styles.loadingState}>Loading...</p>

    return (
        <div className={styles.wrapper}>
            <div onClick={() => navigate(-1)} className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
            </div>
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
        </div>
    );
}

export default DetailEvent;