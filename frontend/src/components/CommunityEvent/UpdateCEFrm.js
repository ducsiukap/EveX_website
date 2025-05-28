import { useForm } from "react-hook-form";
import { updateCE, findCEById } from "../../controllers/CommunityEventDAO";
import CommunityEvent from "../../models/CommunityEvent";
import { useNavigate, useParams } from "react-router-dom";
import styles from './UpdateCE.module.css';
import { useEffect, useState } from "react";

function UpdateCE({ user }) {
    const { register, handleSubmit, getValues, setValue, clearErrors, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = () => {
            const event = findCEById(id);
            console.log(event);
            reset({
                id: event.id,
                title: event.title,
                description: event.description,
                location: event.location,
                startTime: new Date(new Date(event.startTime).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
                endTime: new Date(new Date(event.endTime).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
                status: event.status,
                isFree: String(event.isFree),
                createdAt: event.createdAt,
                ticketTypes: event.ticketTypes.map(item => item.toJSON()),
                org: event.org.toJSON()
            });
            setLoading(false);
        }
        fetchData();
    }, [id, reset]);

    const handleCreate = (data) => {
        if (data.isFree === "1") {
            const event = new CommunityEvent(
                data.title,
                data.description,
                data.location,
                new Date(data.startTime).toISOString(),
                new Date(data.endTime).toISOString(),
                data.status,
                data.isFree,
                data.createdAt,
                [],
                data.org
            )
            event.id = data.id;
            updateCE(event);
            navigate(`/my-events/view/${event.id}`);
        } else {
            // const ticketsJSON = Object.fromEntries(data.ticketTypes.map(e => [e.id, e]));
            console.log(data);
            navigate(`/my-events/modify-ticket`, { state: data });
        }
    };

    if (loading) return <p className={styles.loadingState}>Loading...</p>;

    return (
        <div className={styles.editEventContainer}>
            <h3 className={styles.editTitle}>Cập nhật sự kiện</h3>
            <form className={styles.editForm} onSubmit={handleSubmit(handleCreate)}>
                <div className={styles.inputGroup}>
                    <label htmlFor="title">Tên sự kiện</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Nhập tên sự kiện..."
                        {...register('title', {
                            required: 'Vui lòng nhập tên sự kiện',
                            onChange: e => {
                                setValue('title', e.target.value.trimStart());
                                clearErrors('title');
                            }
                        })}
                    />
                    {errors.title && <span className={styles.validationError}>{errors.title.message}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="location">Địa điểm</label>
                    <input
                        id="location"
                        type="text"
                        placeholder="Nhập địa điểm..."
                        {...register('location', {
                            onChange: e => {
                                setValue('location', e.target.value.trimStart());
                            }
                        })}
                    />
                    {errors.location && <span className={styles.validationError}>{errors.location.message}</span>}
                </div>

                <div className={styles.dateTimeWrapper}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="startTime">Thời gian bắt đầu</label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            {...register('startTime', {
                                required: 'Vui lòng nhập thời gian bắt đầu!'
                            })}
                        />
                        {errors.startTime && <span className={styles.validationError}>{errors.startTime.message}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="endTime">Thời gian kết thúc</label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            {...register('endTime', {
                                required: 'Vui lòng nhập thời gian kết thúc!',
                                validate: (value) => {
                                    if (!value) return true;
                                    const startTime = getValues('startTime');
                                    if (startTime > value) return "Khoảng thời gian không hợp lệ!";
                                    return true;
                                }
                            })}
                        />
                        {errors.endTime && <span className={styles.validationError}>{errors.endTime.message}</span>}
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                        id="description"
                        placeholder="Mô tả chi tiết sự kiện..."
                        {...register('description', {
                            onChange: e => setValue('description', e.target.value.trimStart())
                        })}
                    />
                    {errors.description && <span className={styles.validationError}>{errors.description.message}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label>Trạng thái</label>
                    <div className={styles.radioOptionsGroup}>
                        <label className={styles.radioOption}>
                            <input
                                type="radio"
                                value="private"
                                {...register('status')}
                            />
                            <span>Riêng tư</span>
                        </label>
                        <label className={styles.radioOption}>
                            <input
                                type="radio"
                                value="public"
                                {...register('status')}
                            />
                            <span>Công khai</span>
                        </label>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Loại vé</label>
                    <div className={styles.radioOptionsGroup}>
                        <label className={styles.radioOption}>
                            <input
                                type="radio"
                                value={1}
                                {...register('isFree')}
                            />
                            <span>Miễn phí</span>
                        </label>
                        <label className={styles.radioOption}>
                            <input
                                type="radio"
                                value={0}
                                {...register('isFree')}
                            />
                            <span>Trả phí</span>
                        </label>
                    </div>
                </div>

                <button type="submit" className={styles.saveButton}>
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
}

export default UpdateCE;