import Report from '../models/Report.js';
import { getUserById } from './UserDAO.js'
import { findCEById } from './CommunityEventDAO.js';

const reports = [
    {
        id: 401,
        createdAt: "2025-05-03T14:00:00Z",
        reason: "Thông tin sự kiện 'Ngày hội Việc làm IT' ghi miễn phí nhưng khi đến nơi lại yêu cầu mua vé vào cổng?",
        status: "pending",
        response: null,
        userId: 4,
        eventId: 203
    },
    {
        id: 402,
        createdAt: "2025-05-04T08:15:00Z",
        reason: "Sự kiện 'Ngày hội Văn hóa Nhật Bản' quá đông, công tác tổ chức không đảm bảo an toàn.",
        status: "pending",
        response: null,
        userId: 1,
        eventId: 215
    },
    {
        id: 403,
        createdAt: "2025-04-28T09:00:00Z",
        reason: "Nội dung trong 'Triển lãm Ảnh Sài Gòn Qua Lăng Kính' có hình ảnh nhạy cảm, không phù hợp.",
        status: "pending",
        response: null,
        userId: 5,
        eventId: 206
    },
    {
        id: 404,
        createdAt: "2025-05-02T11:00:00Z",
        reason: "Không thể liên hệ được Ban tổ chức sự kiện 'Hội chợ Sách Mùa Hè 2025' qua thông tin được cung cấp.",
        status: "pending",
        response: null,
        userId: 13,
        eventId: 201
    },
    {
        id: 405,
        createdAt: "2025-05-04T09:00:00Z",
        reason: "Địa điểm tổ chức 'Chiến dịch Chủ Nhật Xanh' bị thay đổi mà không có thông báo trước.",
        status: "pending",
        response: null,
        userId: 16,
        eventId: 205
    },
    {
        id: 406,
        createdAt: "2025-04-29T15:00:00Z",
        reason: "Sự kiện 'Đêm nhạc gây quỹ Trái Tim Xanh' kết thúc sớm hơn nhiều so với thời gian công bố.",
        status: "pending",
        response: null,
        userId: 1,
        eventId: 204
    },
    {
        id: 407,
        createdAt: "2025-05-03T16:00:00Z",
        reason: "Yêu cầu hoàn tiền vé sự kiện 'Hội nghị Công nghệ TechConnect 2025' do sự kiện bị hoãn.",
        status: "pending",
        response: null,
        userId: 4,
        eventId: 202
    },
    {
        id: 408,
        createdAt: "2025-05-01T13:00:00Z",
        reason: "Chất lượng âm thanh tại 'Buổi chiếu phim ngoài trời' quá tệ, không nghe được gì.",
        status: "pending",
        response: null,
        userId: 5,
        eventId: 211
    },
    {
        id: 409,
        createdAt: "2025-05-04T09:30:00Z",
        reason: "Sự kiện 'Talkshow Sức Khỏe Tinh Thần' có thu phí nhưng chất lượng không tương xứng.",
        status: "pending",
        response: null,
        userId: 2,
        eventId: 212
    },
    {
        id: 410,
        createdAt: "2025-04-22T10:00:00Z",
        reason: "Ban tổ chức 'Triển lãm Ảnh Sài Gòn Qua Lăng Kính' có thái độ không tôn trọng khách tham quan.",
        status: "pending",
        response: null,
        userId: 13,
        eventId: 206
    }
];

const findAll = () => {
    const result = reports
        .filter((r) => r.status === 'pending')
        .sort((r1, r2) => {
            const d1 = new Date(r1.createdAt);
            const d2 = new Date(r2.createdAt);
            return d1 - d2;
        })
        .map((r) => {
            const x = new Report(r.createdAt, r.reason, r.status, r.response, getUserById(r.userId), findCEById(r.eventId));
            x.id = r.id;
            return x;
        })
    // console.log(result);

    return result;
}

const resolvedReport = (id) => {
    for (let i = 0; i < reports.length; ++i) {
        if (reports[i].id === id) {
            reports[i].status = 'resolved';
            return true;
        }
    }
    return false;
}

export { findAll, resolvedReport };