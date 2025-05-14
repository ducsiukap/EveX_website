import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser,
    faCalendarAlt,
    faSearch,
    faTicket
} from '@fortawesome/free-solid-svg-icons';

import './Home.css';

const menuItems = [
    {
        path: '/profile',
        icon: faUser,
        title: 'Quản lý tài khoản',
        description: 'Quản lý thông tin tài khoản'
    },
    {
        path: '/my-events',
        icon: faCalendarAlt,
        title: 'Sự kiện cá nhân',
        description: 'Tạo và quản lý các sự kiện riêng của bạn'
    },
    {
        path: '/explore',
        icon: faSearch,
        title: 'Tìm sự kiện',
        description: 'Khám phá các sự kiện cộng đồng hấp dẫn'
    },
    {
        path: '/orders',
        icon: faTicket,
        title: 'Vé đã mua',
        description: 'Xem danh sách vé sự kiện bạn đã mua'
    }
];

function PersonalHome() {
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
                            <p>{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PersonalHome;