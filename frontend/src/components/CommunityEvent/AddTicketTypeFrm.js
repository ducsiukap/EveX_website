import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ViewCEForm from "../ViewCEForm";
import CommunityEvent from "../../models/CommunityEvent";
import { addCE } from "../../controllers/CommunityEventDAO";

import styles from './AddTicketType.module.css';

function AddTicket({ user }) {
    const navigate = useNavigate();
    const [event, setEvent] = useState();
    const [tickets, setTickets] = useState([]);
    const location = useLocation();

    const { register, handleSubmit, setValue, reset, setError, clearErrors, formState: { errors } } = useForm();

    useEffect(() => {
        const data = location.state;
        if (!data) {
            navigate(-1);
        }
        setEvent(new CommunityEvent(data.title, data.description, data.location, data.startTime, data.endTime, data.status, data.isFree, data.createdAt, [], user));
    }, [location, navigate, user]);

    const handleAdd = (data) => {
        const exists = tickets.find(item => item.name === data.name);
        if (exists) {
            setError('name', {
                type: 'manual',
                message: 'Vé đã tồn tại'
            });
            return;
        }
        setTickets([...tickets, data])
        reset({
            name: '',
            price: '',
            quantity: ''
        })
    }

    const handleDelete = (index) => {
        if (index < 0 || index >= tickets.length) return;
        // console.log(index)
        setTickets(tickets.filter((_, idx) => idx !== index))
    }

    const handleSave = () => {
        const data = event;
        if (tickets.length === 0) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm('Sự kiện sẽ chuyển thành sự kiện miễn phí!'))
                data.isFree = 1;
            else return;
        } else
            data.ticketTypes = tickets;
        const postData = { body: { event: data } };
        const newId = addCE(postData);
        // console.log(newId);
        navigate(`/my-events/view/${newId}`);
    }

    if (!event) return null;
    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                <div className={styles.eventSection}>
                    <ViewCEForm event={event} />
                </div>
                <div className={styles.ticketSection}>
                    <section className={styles.card}>
                        <header className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Danh sách vé</h3>
                        </header>
                        <main className={styles.cardBody}>
                            <table className={styles.ticketTable}>
                                <tr>
                                    <th>Số thứ tự</th>
                                    <th>Loại vé</th>
                                    <th>Giá vé</th>
                                    <th>Số lượng</th>
                                    <th>Xóa</th>
                                </tr>
                                {tickets.length > 0 ? tickets.map((item, idx) =>
                                    <tr className={styles.ticketRow}>
                                        <td>{idx + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td><button className={styles.btnDelete} onClick={() => handleDelete(idx)}>Xóa vé</button></td>
                                    </tr>
                                ) : <tr>
                                    <td colSpan="5" className={styles.emptyMessage}>Không có vé</td>
                                </tr>}
                            </table>
                        </main>
                    </section>

                    <section className={styles.card}>
                        <header className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Thêm vé</h3>
                        </header>
                        <main className={styles.cardBody}>
                            <form className={styles.ticketForm} onSubmit={handleSubmit(handleAdd)}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="name">Loại vé</label>
                                    <input
                                        className={styles.formInput}
                                        id="name"
                                        type="text"
                                        placeholder="Nhập tên vé..."
                                        {...register('name', { required: 'Vui lòng nhập tên vé' })}
                                        onChange={(e) => {
                                            setValue('name', e.target.value.trimStart());
                                            clearErrors('name');
                                        }}
                                    />
                                    {errors.name && <span className={styles.formError}>{errors.name.message}</span>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="price">Giá vé</label>
                                    <input
                                        className={styles.formInput}
                                        id="price"
                                        type="number"
                                        {...register('price', {
                                            required: 'Vui lòng nhập giá vé phát hành',
                                            validate: value => {
                                                const number = Number(value);
                                                if (isNaN(number) || number <= 0) return 'Giá vé không hợp lệ.'
                                            }
                                        })}
                                    />
                                    {errors.price && <span className={styles.formError}>{errors.price.message}</span>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="quantity">Số lượng</label>
                                    <input
                                        className={styles.formInput}
                                        id="quantity"
                                        type="number"
                                        {...register('quantity', {
                                            required: 'Vui lòng nhập số lượng vé phát hành',
                                            validate: value => {
                                                const number = Number(value);
                                                if (isNaN(number) || number <= 0) return 'Số lượng vé không hợp lệ.'
                                            }
                                        })}
                                        onChange={(e) => {
                                            setValue('quantity', Math.floor(Number(e.target.value)));
                                            clearErrors('quantity');
                                        }}
                                    />
                                    {errors.quantity && <span className={styles.formError}>{errors.quantity.message}</span>}
                                </div>

                                <button className={styles.btnAdd} type="submit">Thêm</button>
                            </form>
                        </main>
                    </section>
                </div>

                <div className={styles.actionBar}>
                    <button className={styles.btnCancel} onClick={() => navigate(`/my-events`, { replace: true })}>Hủy</button>
                    <button className={styles.btnSave} onClick={handleSave}>Tạo sự kiện</button>
                </div>
            </div>
        </div>
    );
}

export default AddTicket;
