
import { useEffect, useState } from "react";
import { findCEById } from "../../controllers/CommunityEventDAO";
import { checkTicket } from "../../controllers/TicketDAO";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";

import styles from './CheckTicket.module.css';

function CheckTicket({ user }) {
    const { id } = useParams();
    const [event, setEvent] = useState();
    const [checkStatus, setCheckStatus] = useState();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const data = findCEById(id, true);

        if (!data || data.org.id !== user.id) navigate(`/verification`);
        // console.log(data);
        setEvent(data);
    }, [id, navigate, user.id])

    const handleChange = (e) => {
        setCheckStatus(null);
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (value.length > 4) {
            value = value.slice(0, 4) + " " + value.slice(4, 8);
        }
        setValue("code", value);
        setCheckStatus(null);
    };

    const handleCheck = (data) => {
        // console.log(data);
        const response = checkTicket(data.code, event.id);
        // console.log(response);
        setCheckStatus(response);
    }

    if (!event) return <p>Loading...</p>

    return (
        <div className={styles.container}>
            <div className={styles.eventContainer}>
                <div className={styles.title}>
                    <span>{event.title}</span>
                </div>
                <div className={styles.eventInfo}>
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className={styles.eventLocation}>{event.location}</div>
                </div>
                <div className={styles.eventInfo}>
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className={styles.eventTime}>
                        <span>{new Date(event.startTime).toLocaleString('vi-VN')}</span>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <span>{new Date(event.endTime).toLocaleString('vi-VN')}</span>
                    </div>
                </div>
            </div>

            <div className={styles.partition}></div>

            <form onSubmit={handleSubmit(handleCheck)} className={styles.form}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="code">Mã vé</label>
                    <input
                        id="code"
                        {...register('code', {
                            required: 'Vui lòng nhập mã vé!',
                            pattern: {
                                value: /[A-Z0-9]{4} [A-Z0-9]{4}/,
                                message: 'Mã vé không đúng định dạng!'
                            },
                            minLength: {
                                value: 9,
                                message: 'Độ dài mã vé không hợp lệ!'
                            },
                            maxLength: {
                                value: 9,
                                message: 'Độ dài mã vé không hợp lệ!'
                            }
                        })}
                        onChange={handleChange}
                        placeholder="Nhập mã vé dạng XXXX-XXXX để kiểm tra"
                    />
                    {errors.code && <span className={styles.error}>{errors.code.message}</span>}
                </div>
                <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.checkButton}>Kiểm tra</button>
                </div>
                {checkStatus && <div className={checkStatus.valid ? styles.validTicket : styles.invalidTicket}>
                    {checkStatus.status}
                </div>}
            </form>

        </div>
    )
}

export default CheckTicket;