import { useForm } from "react-hook-form";
import { addCE } from "../../controllers/CommunityEventDAO";
import CommunityEvent from "../../models/CommunityEvent";
import { useNavigate } from "react-router-dom";
import styles from './CreateCE.module.css';

function CreateCE({ user }) {
    const { register, handleSubmit, getValues, setValue, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            status: 'private',
            isFree: 1
        }
    });
    const navigate = useNavigate();

    const handleCreate = (data) => {
        if (data.isFree === "1") {
            const event = new CommunityEvent(
                data.title,
                data.description,
                data.location,
                new Date(data.startTime).toISOString(),
                data.endTime ? new Date(data.endTime).toISOString() : '',
                data.status,
                data.isFree,
                new Date().toISOString(),
                [],
                user
            )
            const postData = {
                body: { event: event }
            };
            const newId = addCE(postData);
            navigate(`/my-events/view/${newId}`);
        } else {
            console.log(data);
            navigate(`/my-events/add-tickets`, { state: data });
        }
    };

    return (
        <div className={styles.formSection}>
            <h3 className={styles.formTitle}>Thêm sự kiện mới</h3>
            <form className={styles.form} onSubmit={handleSubmit(handleCreate)}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Tên sự kiện</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Nhập tên sự kiện..."
                        {...register('title', { required: 'Vui lòng nhập tên sự kiện' })}
                        onChange={(e) => {
                            setValue('title', e.target.value.trimStart());
                            clearErrors('title');
                        }}
                    />
                    {errors.title && <span className={styles.error}>{errors.title.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="location">Địa điểm</label>
                    <input
                        id="location"
                        type="text"
                        placeholder="Nhập địa điểm..."
                        {...register('location')}
                        onChange={(e) => {
                            setValue('location', e.target.value.trimStart());
                            clearErrors('location');
                        }}
                    />
                    {errors.location && <span className={styles.error}>{errors.location.message}</span>}
                </div>

                <div className={styles.timeGroup}>
                    <div className={styles.formGroup}>
                        <label htmlFor="startTime">Thời gian bắt đầu</label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            {...register('startTime', {
                                required: 'Vui lòng nhập thời gian bắt đầu!'
                            })}
                        />
                        {errors.startTime && <span className={styles.error}>{errors.startTime.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
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
                        {errors.endTime && <span className={styles.error}>{errors.endTime.message}</span>}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                        id="description"
                        placeholder="Mô tả chi tiết sự kiện..."
                        {...register('description')}
                        onChange={(e) => setValue('description', e.target.value.trimStart())}
                    />
                    {errors.description && <span className={styles.error}>{errors.description.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>Trạng thái</label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="private"
                                {...register('status')}
                                defaultChecked
                            />
                            <span>Riêng tư</span>
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="public"
                                {...register('status')}
                            />
                            <span>Công khai</span>
                        </label>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Loại vé</label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value={1}
                                {...register('isFree')}
                                defaultChecked
                            />
                            <span>Miễn phí</span>
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value={0}
                                {...register('isFree')}
                            />
                            <span>Trả phí</span>
                        </label>
                    </div>
                </div>

                <button type="submit" className={styles.submitBtn}>Tạo</button>
            </form>
        </div>
    );
}

export default CreateCE;