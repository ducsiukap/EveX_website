import CommunityEvent from '../models/CommunityEvent.js';
import { getUserById } from './UserDAO.js';
import { findTicketTypeByEventId, addTicketType, deleteTicketTypeByEventId, updateTicketType, findTicketTypeById } from './TicketTypeDAO.js'

const events = [
    {
        id: 201,
        title: "Hội chợ Sách Mùa Hè 2025",
        description: "Sự kiện sách lớn nhất năm với hàng ngàn đầu sách giảm giá, giao lưu tác giả.",
        location: "Nhà Văn hóa Thanh Niên, Q.1, TP.HCM",
        sT: "2025-06-15T01:00:00Z",
        eT: "2025-06-18T14:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-04-10T03:00:00Z",
        OrganizationUserId: 6
    },
    {
        id: 202,
        title: "Hội nghị Công nghệ TechConnect 2025",
        description: "Nơi quy tụ các chuyên gia hàng đầu về AI, Blockchain và Cloud Computing.",
        location: "Trung tâm Hội nghị White Palace, TP. Thủ Đức",
        sT: "2025-05-19T01:30:00Z",
        eT: "2025-05-20T10:00:00Z",
        status: "public",
        isFree: 0,
        createdAt: "2025-03-15T07:30:00Z",
        OrganizationUserId: 7
    },
    {
        id: 203,
        title: "Ngày hội Việc làm IT",
        description: "Cơ hội gặp gỡ các nhà tuyển dụng lớn trong ngành Công nghệ thông tin.",
        location: "Đại học Bách Khoa TP.HCM",
        sT: "2025-05-25T01:00:00Z",
        eT: "2025-05-25T09:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-04-20T02:00:00Z",
        OrganizationUserId: 6
    },
    {
        id: 204,
        title: "Đêm nhạc gây quỹ 'Trái Tim Xanh'",
        description: "Đêm nhạc acoustic với sự tham gia của các ca sĩ trẻ nhằm gây quỹ cho trẻ em vùng cao.",
        location: "Sân khấu ngoài trời NVH Thanh Niên",
        sT: "2025-05-17T12:00:00Z",
        eT: "2025-05-17T15:00:00Z",
        status: "public",
        isFree: 0,
        createdAt: "2025-04-25T03:00:00Z",
        OrganizationUserId: 9
    },
    {
        id: 205,
        title: "Chiến dịch 'Chủ Nhật Xanh'",
        description: "Cùng nhau dọn dẹp rác thải tại các công viên và kênh rạch trong thành phố.",
        location: "Công viên Hoàng Văn Thụ, Q.Tân Bình",
        sT: "2025-05-11T00:30:00Z",
        eT: "2025-05-11T04:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-05-01T09:00:00Z",
        OrganizationUserId: 10
    },
    {
        id: 206,
        title: "Triển lãm Ảnh 'Sài Gòn Qua Lăng Kính'",
        description: "Trưng bày các tác phẩm nhiếp ảnh đặc sắc về vẻ đẹp Sài Gòn xưa và nay.",
        location: "Đường sách Nguyễn Văn Bình, Q.1",
        sT: "2025-04-20T02:00:00Z",
        eT: "2025-04-27T13:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-03-01T01:00:00Z",
        OrganizationUserId: 15
    },
    {
        id: 207,
        title: "Giải chạy Marathon 'Bước Chân Vì Cộng Đồng'",
        description: "Giải chạy bộ từ thiện nhằm ủng hộ người già neo đơn.",
        location: "Khu đô thị Phú Mỹ Hưng, Q.7",
        sT: "2025-04-09T22:00:00Z",
        eT: "2025-04-10T03:00:00Z",
        status: "public",
        isFree: 0,
        createdAt: "2025-05-01T02:00:00Z",
        OrganizationUserId: 6
    },
    {
        id: 208,
        title: "Workshop nội bộ 'Team Building Kỹ Năng Mềm'",
        description: "Workshop dành riêng cho nhân viên công ty Tech Conference.",
        location: "Văn phòng công ty Tech Conference",
        sT: "2025-05-09T06:30:00Z",
        eT: "2025-05-09T09:30:00Z",
        status: "private",
        isFree: 1,
        createdAt: "2025-04-28T08:00:00Z",
        OrganizationUserId: 7
    },
    {
        id: 209,
        title: "Phiên chợ Đồ cũ Cuối tuần",
        description: "Mua bán, trao đổi các mặt hàng đồ cũ, đồ handmade.",
        location: "Câu lạc bộ Phan Đình Phùng, Q.3",
        sT: "2025-04-26T02:00:00Z",
        eT: "2025-04-27T10:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-04-15T03:30:00Z",
        OrganizationUserId: 9
    },
    {
        id: 210,
        title: "Lễ hội Ẩm thực Đường phố",
        description: "Thưởng thức các món ăn đường phố đặc sắc từ khắp mọi miền.",
        location: "Sân vận động Hoa Lư, Q.1",
        sT: "2025-09-01T03:00:00Z",
        eT: "2025-09-03T15:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-05-02T04:00:00Z",
        OrganizationUserId: 15
    },
    {
        id: 211,
        title: "Buổi chiếu phim ngoài trời",
        description: "Chiếu bộ phim kinh điển dưới bầu trời sao.",
        location: "Công viên Vinhomes Central Park",
        sT: "2025-05-31T12:00:00Z",
        eT: "2025-05-31T14:30:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-05-03T07:00:00Z",
        OrganizationUserId: 9
    },
    {
        id: 212,
        title: "Talkshow 'Sức Khỏe Tinh Thần'",
        description: "Chia sẻ về cách đối mặt với stress và lo âu trong cuộc sống hiện đại.",
        location: "Hội trường Khách sạn Liberty Central",
        sT: "2025-06-07T07:00:00Z",
        eT: "2025-06-07T09:00:00Z",
        status: "public",
        isFree: 0,
        createdAt: "2025-05-04T02:00:00Z",
        OrganizationUserId: 15
    },
    {
        id: 213,
        title: "Trồng cây gây rừng",
        description: "Hoạt động trồng cây tại rừng ngập mặn Cần Giờ.",
        location: "Khu dự trữ sinh quyển Cần Giờ",
        sT: "2025-06-22T00:00:00Z",
        eT: "2025-06-22T05:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-05-04T03:00:00Z",
        OrganizationUserId: 10
    },
    {
        id: 214,
        title: "Cuộc thi Sáng tạo Robot",
        description: "Sân chơi cho các bạn trẻ yêu thích lập trình và chế tạo robot.",
        location: "Nhà thi đấu Phú Thọ, Q.11",
        sT: "2025-08-23T01:00:00Z",
        eT: "2025-08-24T10:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-04-29T10:00:00Z",
        OrganizationUserId: 7
    },
    {
        id: 215,
        title: "Ngày hội Văn hóa Nhật Bản",
        description: "Trải nghiệm văn hóa, ẩm thực, trò chơi truyền thống Nhật Bản.",
        location: "AEON Mall Tân Phú",
        sT: "2025-05-03T03:00:00Z",
        eT: "2025-05-04T14:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-04-01T04:30:00Z",
        OrganizationUserId: 6
    },
    {
        id: 216,
        title: "Họp Ban tổ chức nội bộ",
        description: "Event created by user ID 17 with role O, only visible to members.",
        location: "Virtual / Online (Zoom)",
        sT: "2025-09-10T03:00:00Z",
        eT: "2025-09-10T04:00:00Z",
        status: "private",
        isFree: 1,
        createdAt: "2025-05-04T04:00:00Z",
        OrganizationUserId: 17
    },
    {
        id: 217,
        title: "Sự kiện tình nguyện",
        description: "Sự kiện dọn rác cộng đồng.",
        location: "Công viên Lê Thị Riêng",
        sT: "2025-05-01T02:00:00Z",
        eT: "2025-05-01T05:00:00Z",
        status: "public",
        isFree: 1,
        createdAt: "2025-04-15T03:00:00Z",
        OrganizationUserId: 10
    },
    {
        id: 218,
        title: "Year End Party - Dream Org",
        description: "Tiệc cuối năm dành riêng cho thành viên Dream Org.",
        location: "Khách sạn Rex",
        sT: "2025-12-20T11:00:00Z",
        eT: "2025-12-20T15:00:00Z",
        status: "private",
        isFree: 1,
        createdAt: "2025-11-01T02:00:00Z",
        OrganizationUserId: 15
    }
];

let quantity = events.length;

const findCEById = (eid, toCheck, notStatus) => {
    const event_id = Number(eid);
    if (isNaN(event_id)) return null;

    if (notStatus) {
        const result = events.find((e) => (e.id === event_id));
        if (!result) return null;
        const event = new CommunityEvent(
            result.title,
            result.description,
            result.location,
            result.sT,
            result.eT,
            result.status,
            result.isFree,
            result.createdAt,
            findTicketTypeByEventId(result.id),
            getUserById(result.OrganizationUserId)
        );
        event.id = result.id;
        return event;
    } else {
        if (!toCheck) {
            const result = events.find((e) => (e.id === event_id));
            if (!result || result.status === 'hide') return null;
            const event = new CommunityEvent(
                result.title,
                result.description,
                result.location,
                result.sT,
                result.eT,
                result.status,
                result.isFree,
                result.createdAt,
                findTicketTypeByEventId(result.id),
                getUserById(result.OrganizationUserId)
            );
            event.id = result.id;
            return event;
        } else {
            const result = events.find((e) => e.id === event_id);
            if (!result || result.status !== 'public' || result.isFree === 1) return null;
            const now = new Date();
            const eventStartDate = new Date(result.sT);
            const eventEndDate = new Date(result.eT);
            eventStartDate.setHours(0, 0, 0, 0);
            if (eventStartDate >= now || eventEndDate < now) return null;
            const event = new CommunityEvent(
                result.title,
                result.description,
                result.location,
                result.sT,
                result.eT,
                result.status,
                result.isFree,
                result.createdAt,
                findTicketTypeByEventId(result.id),
                getUserById(result.OrganizationUserId)
            );
            event.id = result.id;
            return event;
        }
    }
}

const banCE = (id) => {
    for (let i = 0; i < events.length; ++i) {
        if (events[i].id === id) {
            events[i].status = 'hide';
            return true;
        }
    }
    return false;
}


const addCE = (req) => {
    const { event } = req.body;
    ++quantity;
    event.id = quantity;
    const query = {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        sT: event.startTime,
        eT: event.endTime,
        status: event.status,
        isFree: Number(event.isFree),
        createdAt: event.createdAt,
        OrganizationUserId: event.org.id,
    }

    events.push(query);

    if (query.isFree === 0) {
        event.ticketTypes.forEach((item) => addTicketType({ ...item, event_id: event.id }));
    }
    return event.id;
}

const findCEbyUserId = (id, toCheck) => {
    const uid = Number(id);
    if (isNaN(uid)) return [];

    if (!toCheck) {
        const result = events
            .filter(item => item.OrganizationUserId === uid && item.status !== 'hide')
            .map(item => {
                const event = new CommunityEvent(
                    item.title,
                    item.description,
                    item.location,
                    item.sT,
                    item.eT,
                    item.status,
                    item.isFree,
                    item.createdAt,
                    findTicketTypeByEventId(item.id),
                    getUserById(item.OrganizationUserId)
                );
                event.id = item.id;
                return event;
            });
        return result;
    } else {
        const now = new Date();
        // today.setHours(0, 0, 0, 0);
        const result = events
            .filter(item => {
                const eventStartDate = new Date(item.sT);
                const eventEndDate = new Date(item.eT);
                eventStartDate.setHours(0, 0, 0, 0);

                return (item.OrganizationUserId === uid && item.status === 'public' && item.isFree === 0 && eventStartDate <= now && eventEndDate >= now);
            })
            .map(item => {
                const event = new CommunityEvent(
                    item.title,
                    item.description,
                    item.location,
                    item.sT,
                    item.eT,
                    item.status,
                    item.isFree,
                    item.createdAt,
                    findTicketTypeByEventId(item.id),
                    getUserById(item.OrganizationUserId)
                );
                event.id = item.id;
                return event;
            });
        return result;

    }
}

const normalizeText = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const findCEByName = (key, userId) => {

    if (userId) {
        const uid = Number(userId);
        if (isNaN(uid)) return [];
        const result = events
            .filter(item => item.OrganizationUserId === uid && item.status !== 'hide' && normalizeText(item.title).includes(normalizeText(key)))
            .map(item => {
                const event = new CommunityEvent(
                    item.title,
                    item.description,
                    item.location,
                    item.sT,
                    item.eT,
                    item.status,
                    item.isFree,
                    item.createdAt,
                    findTicketTypeByEventId(item.id),
                    getUserById(item.OrganizationUserId)
                );
                event.id = item.id;
                return event;
            });
        return result;
    } else {
        const result = events
            .filter(item => item.status === 'public' && normalizeText(item.title).includes(normalizeText(key)))
            .map(item => {
                const event = new CommunityEvent(
                    item.title,
                    item.description,
                    item.location,
                    item.sT,
                    item.eT,
                    item.status,
                    item.isFree,
                    item.createdAt,
                    findTicketTypeByEventId(item.id),
                    getUserById(item.OrganizationUserId)
                );
                event.id = item.id;
                return event;
            });
        return result;
    }
}

const updateCE = event => {
    // console.log(event);
    const event_id = Number(event.id);
    const isFree = Number(event.isFree);
    if (isNaN(event_id) || isNaN(isFree)) return false;

    const found = events.find(item => item.id === event_id);
    if (!found) return false;

    // console.log(event);
    found.title = event.title;
    found.description = event.description;
    found.sT = event.startTime;
    found.eT = event.endTime;
    found.status = event.status;

    if (found.isFree === 0) {
        if (isFree === 0) {
            event.ticketTypes.forEach(item => {
                console.log(item.id);
                if (item.id) updateTicketType(item);
                else addTicketType({ ...item, event_id: found.id });
            })
        } else {
            deleteTicketTypeByEventId(found.id);
        }
    } else {
        if (isFree === 0) {
            event.ticketTypes.forEach(item => {
                if (!item.id || !findTicketTypeById(item.id))
                    addTicketType({ ...item, event_id: found.id })
            });
        }
    }

    found.isFree = isFree;
}

const findAllEventStatistic = (userId) => {
    const uid = Number(userId);
    if (isNaN(uid)) return [];

    const userEvent =
        events.filter(item => item.OrganizationUserId === uid && item.isFree === 0 && item.status === 'public')
            .map(item => {
                const event = new CommunityEvent(
                    item.title,
                    item.description,
                    item.location,
                    item.startTime,
                    item.endTime,
                    item.status,
                    item.isFree,
                    item.createdAt,
                    findTicketTypeByEventId(item.id),
                    getUserById(item.OrganizationUserId)
                );
                event.id = item.id;
                return event;
            });

    const result = userEvent.map(event => {
        const ticketTypes = event.ticketTypes;
        let bookingRate, totalRevenue, checkinRate;
        bookingRate = 0;
        totalRevenue = 0;
        checkinRate = 0;
        ticketTypes.forEach((ticketType) => {
            let checkin = 0;
            const tickets = ticketType.tickets;
            tickets.forEach(ticket => {
                totalRevenue += ticket.price;
                checkin += (ticket.checkedAt ? 1 : 0);
                // console.log(ticket.checkedAt);
            })
            checkinRate += (checkin / tickets.length) || 0;
            bookingRate += tickets.length / ticketType.quantity;
        })
        bookingRate /= ticketTypes.length;
        checkinRate /= ticketTypes.length;

        return {
            event: {
                id: event.id,
                title: event.title
            },
            revenue: totalRevenue,
            bookingRate: bookingRate,
            checkinRate: checkinRate
        }
    })
    return result;
}

const findOneEventStatistic = (eventId, userId) => {
    const eid = Number(eventId);
    const uid = Number(userId);

    if (isNaN(eid) || isNaN(uid)) return null;
    const event = events.find(item => item.id === eid);
    if (event.OrganizationUserId !== uid || event.isFree === 1 || event.status !== 'public') return null;

    const ticketTypes = findTicketTypeByEventId(event.id);
    let totalRevenue;
    totalRevenue = 0;
    // console.log(ticketTypes);
    const rates =
        ticketTypes.map((ticketType) => {
            let checkin = 0;
            const tickets = ticketType.tickets;
            tickets.forEach(ticket => {
                totalRevenue += ticket.price;
                checkin += (ticket.checkedAt ? 1 : 0);
                // console.log(ticket.checkedAt);
            })

            const checkinRate = (checkin / tickets.length) || 0;
            const bookingRate = (tickets.length / ticketType.quantity);

            return {
                ticketType: {
                    name: ticketType.name,
                    price: ticketType.price,
                    quantity: ticketType.quantity
                },
                bookingRate: {
                    amount: tickets.length,
                    rate: bookingRate
                },
                checkinRate: {
                    amount: checkin,
                    rate: checkinRate
                }
            };
        })

    return {
        event: {
            id: event.id,
            title: event.title
        },
        revenue: totalRevenue,
        rates: rates
    };
}

const findOnePublicCE = (id) => {
    const eid = Number(id);
    if (isNaN(eid)) return null;

    const event = events.find(item => item.id === eid);
    if (event.status !== 'public') return null;

    const result = new CommunityEvent(
        event.title,
        event.description,
        event.location,
        event.sT,
        event.eT,
        event.status,
        event.isFree,
        event.createdAt,
        findTicketTypeByEventId(event.id),
        getUserById(event.OrganizationUserId)
    );
    result.id = event.id;

    return result;
}

export { findCEById, banCE, addCE, findCEbyUserId, findCEByName, updateCE, findAllEventStatistic, findOneEventStatistic, findOnePublicCE };