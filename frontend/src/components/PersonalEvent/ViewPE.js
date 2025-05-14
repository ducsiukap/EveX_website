import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { findPEById } from '../../controllers/PersonalEventDAO'
import ViewEventForm from "../ViewEvent";
import './ViewPE.css';
function ViewPE({ user }) {
    const { id } = useParams();
    const [event, setEvent] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        const fetchData = /*async*/ () => {
            const response = /*await*/ findPEById(id);
            // console.log('view - ', response);

            //response.json.....
            setEvent(response);
            setLoading(false);
        }

        fetchData();
    }, [id])

    if (loading) return <h3 className="loading">Loading....</h3>

    if (event.user.id !== user.id) return <Navigate to={'/home'} replace />

    return (
        <div className="view-event-container">
            <ViewEventForm event={event} />

            <div className="button-group">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    Quay lại
                </button>
                <button className="edit-btn" onClick={() => navigate(`/my-events/modify/${id}`)}>
                    Sửa sự kiện
                </button>
            </div>
        </div>
    )

}

export default ViewPE;