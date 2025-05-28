import { useForm } from "react-hook-form";
import './style.css';
import { addPE } from "../../controllers/PersonalEventDAO";
import PersonalEvent from "../../models/PersonalEvent";
import { useNavigate } from "react-router-dom";
function CreatePE({ user }) {
    const { register, handleSubmit, getValues, setValue, clearErrors, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleCreate = (data) => {
        const event = new PersonalEvent(data.title, data.description, data.location, data.startTime, data.endTime, user)
        const postData = {
            body: { event: event }
        };
        const newId = addPE(postData);
        if (newId > 0) {
            event.id = newId;
            console.log(event);
            navigate(`/my-events/view/${newId}`)
        }
    };

    return (
        <div className="form-section">
            <h3 className="form-section__title">Thêm sự kiện mới</h3>
            <form className="form-section__form" onSubmit={handleSubmit(handleCreate)}>
                <div className="Form-group">
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
                    {errors.title && <span className="error">{errors.title.message}</span>}
                </div>
                <div className="Form-group">
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
                    {errors.location && <span className='error'>{errors.location.message}</span>}
                </div>
                <div className="Form-group">
                    <label htmlFor="start-time">Thời gian bắt đầu: </label>
                    <input
                        type="datetime-local"
                        id="start-time"
                        {...register('startTime', {
                            required: 'Vui lòng nhập thời gian bắt đầu!'
                        })}
                    />
                    {errors.startTime && <span className="error">{errors.startTime.message}</span>}
                </div>
                <div className="Form-group">
                    <label htmlFor="end-time">Thời gian kết thúc: </label>
                    <input
                        type="datetime-local"
                        id="end-time"
                        {...register('endTime', {
                            validate: (value) => {
                                if (!value) return true;
                                const startTime = getValues('startTime');
                                if (startTime > value) return "Khoảng thời gian không hợp lệ!";
                                return true;
                            }
                        })}
                    />
                    {errors.endTime && <span className="error">{errors.endTime.message}</span>}
                </div>
                <div className="Form-group">
                    <label htmlFor="description">Mô tả</label>
                    <textarea id="description"
                        {...register('description')}
                        onChange={(e) => setValue('description', e.target.value.trimStart())}
                        placeholder="Mô tả..."
                    />
                    {errors.description && <span className="error">{errors.description.message}</span>}
                </div>

                <button type="submit" className="submit-btn">Tạo</button>
            </form>
        </div>
    );
}

export default CreatePE;