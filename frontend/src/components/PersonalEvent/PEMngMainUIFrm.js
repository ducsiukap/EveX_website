import { faCalendarPlus, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


function PEMngMainUI() {

    const menuItems = [
        {
            path: '/my-events/create',
            icon: faCalendarPlus,
            title: 'Thêm sự kiện mới'
        },
        {
            path: '/my-events/view',
            icon: faCalendarCheck,
            title: 'Quản lý sự kiện'
        }
    ]

    return (
        <div className="home-container">
            <div className="home-actions">
                {menuItems.map((item, index) => (
                    <Link
                        to={item.path}
                        className="home-card"
                        key={index}
                    >
                        <div className="card-icon">
                            <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <div className="card-content">
                            <h3>{item.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PEMngMainUI;