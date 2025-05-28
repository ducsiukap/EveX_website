import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { findPEById, updatePE } from "../../controllers/PersonalEventDAO";
import styles from './UpdatePE.module.css';

function UpdatePE({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, setValue, getValues, reset, formState: { errors, isDirty, isValid } } = useForm({ mode: 'onChange' });

    useEffect(() => {
        const fetchEvent = () => {
            const event = findPEById(id);
            if (!event || event.user.id !== user.id) {
                navigate('/my-events');
                return;
            }

            const obj = {
                title: event.title,
                description: event.description,
                location: event.location
            }

            const startTime = new Date(event.startTime);
            obj.startTime = new Date(startTime.getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16);
            if (event.endTime) {
                const endTime = new Date(event.endTime);
                obj.endTime = new Date(endTime.getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16);
            } else obj.endTime = '';

            reset(obj);
            setLoading(false);
        };

        fetchEvent();
    }, [id, user.id, navigate, setValue]);

    const handleUpdate = (data) => {
        // const startTime = new Date(data.startTime);
        const postData = {
            id: id,
            title: data.title,
            description: data.description,
            location: data.location,
            startTime: new Date(data.startTime).toISOString(),
            endTime: data.endTime ? new Date(data.endTime).toISOString() : '',
            userId: user.id
        }
        if (updatePE(postData)) {
            navigate(`/my-events/view/${id}`);
        } else {
            alert('Lỗi không tìm thấy sự kiện!')
        }
    };

    if (loading) return <h3 className={styles.loading}>Đang tải...</h3>;

    return (
        <div className={styles.formSection}>
            <h3 className={styles.formTitle}>Chỉnh sửa sự kiện</h3>
            <form className={styles.form} onSubmit={handleSubmit(handleUpdate)}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Tên sự kiện</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Nhập tên sự kiện..."
                        {...register('title', { required: 'Vui lòng nhập tên sự kiện', setValueAs: v => v.trimStart() })}
                    />
                    {errors.title && <span className={styles.error}>{errors.title.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="location">Địa điểm</label>
                    <input
                        id="location"
                        type="text"
                        placeholder="Nhập địa điểm..."
                        {...register('location', { setValueAs: v => v.trimStart() })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="startTime">Thời gian bắt đầu</label>
                    <input
                        id="startTime"
                        type="datetime-local"
                        {...register('startTime', {
                            required: 'Vui lòng nhập thời gian bắt đầu'
                        })}
                    />
                    {errors.startTime && <span className={styles.error}>{errors.startTime.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="endTime">Thời gian kết thúc</label>
                    <input
                        id="endTime"
                        type="datetime-local"
                        {...register('endTime', {
                            validate: value => {
                                if (!value) return true;
                                return new Date(value) > new Date(getValues('startTime')) ||
                                    'Thời gian kết thúc không hợp lệ';
                            }
                        })}
                    />
                    {errors.endTime && <span className={styles.error}>{errors.endTime.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                        id="description"
                        placeholder="Mô tả chi tiết sự kiện..."
                        {...register('description', { setValueAs: v => v.trimStart() })}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={() => navigate(-1)}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={!isDirty || !isValid}
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePE;