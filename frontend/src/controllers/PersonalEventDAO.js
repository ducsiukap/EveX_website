import PersonalEvent from "../models/PersonalEvent";
import { getUserById } from "./UserDAO";

const events = [
  {
    "id": 1,
    "title": "Sinh nhật Linh",
    "description": "Tiệc mừng sinh nhật tại nhà hàng ấm cúng.",
    "location": "Nhà hàng The Corner",
    "sT": "2025-05-15T11:00:00Z",
    "eT": "2025-05-15T15:00:00Z",
    "userId": 1
  },
  {
    "id": 2,
    "title": "Họp nhóm dự án cá nhân",
    "description": "Thảo luận tiến độ dự án ABC.",
    "location": "Quán cà phê Highland",
    "sT": "2025-05-10T07:00:00Z",
    "eT": "2025-05-10T09:00:00Z",
    "userId": 2
  },
  {
    "id": 3,
    "title": "Đi xem phim cuối tuần",
    "description": "Xem bộ phim mới ra rạp.",
    "location": "CGV Vincom",
    "sT": "2025-05-18T12:30:00Z",
    "eT": "2025-05-18T14:30:00Z",
    "userId": 5
  },
  {
    "id": 4,
    "title": "Chạy bộ buổi sáng",
    "description": "Chạy bộ quanh công viên gần nhà.",
    "location": "Công viên Tao Đàn",
    "sT": "2025-05-19T23:00:00Z",
    "eT": "2025-05-20T00:00:00Z",
    "userId": 1
  },
  {
    "id": 5,
    "title": "Lớp học Yoga",
    "description": "Tham gia lớp Yoga hàng tuần.",
    "location": "Trung tâm Yoga Harmony",
    "sT": "2025-05-22T11:30:00Z",
    "eT": "2025-05-22T13:00:00Z",
    "userId": 4
  },
  {
    "id": 6,
    "title": "Du lịch cuối tuần",
    "description": "Chuyến đi ngắn ngày đến Vũng Tàu.",
    "location": "Vũng Tàu",
    "sT": "2025-06-01T01:00:00Z",
    "eT": "2025-06-02T10:00:00Z",
    "userId": 13
  },
  {
    "id": 7,
    "title": "Test event for User 17",
    "description": "Event for user with ID 17 (role P).",
    "location": "Test Location",
    "sT": "2025-06-05T03:00:00Z",
    "eT": "2025-06-05T04:00:00Z",
    "userId": 17
  },
  {
    "id": 8,
    "title": "Gặp gỡ bạn bè cũ",
    "description": "Họp lớp đại học sau 5 năm.",
    "location": "Nhà hàng King BBQ",
    "sT": "2025-06-10T12:00:00Z",
    "eT": "2025-06-10T15:30:00Z",
    "userId": 2
  },
  {
    "id": 9,
    "title": "Tham gia Workshop Nhiếp ảnh",
    "description": "Học kỹ thuật chụp ảnh phong cảnh.",
    "location": "Studio Ảnh Xinh",
    "sT": "2025-06-15T02:00:00Z",
    "eT": "2025-06-15T05:00:00Z",
    "userId": 5
  },
  {
    "id": 10,
    "title": "Thăm gia đình",
    "description": "Về quê thăm bố mẹ cuối tuần.",
    "location": "Nhà riêng (Quê)",
    "sT": "2025-06-20T24:00:00Z",
    "eT": "2025-06-22T11:00:00Z",
    "userId": 4
  },
  {
    "id": 11,
    "title": "Hẹn hò cà phê",
    "description": "Gặp gỡ bạn mới quen.",
    "location": "The Coffee House",
    "sT": "2025-06-25T08:00:00Z",
    "eT": "2025-06-25T09:30:00Z",
    "userId": 13
  },
  {
    "id": 12,
    "title": "Đọc sách tại thư viện",
    "description": "Tìm tài liệu cho dự án cá nhân.",
    "location": "Thư viện Khoa học Tổng hợp TP.HCM",
    "sT": "2025-06-28T06:30:00Z",
    "eT": "2025-06-28T10:00:00Z",
    "userId": 1
  },
  {
    "id": 13,
    "title": "Đi bơi thư giãn",
    "description": "Bơi lội tại hồ bơi gần nhà.",
    "location": "Hồ bơi Rạch Miễu",
    "sT": "2025-07-01T10:00:00Z",
    "eT": "2025-07-01T11:30:00Z",
    "userId": 5
  },
  {
    "id": 14,
    "title": "Lịch khám sức khỏe định kỳ",
    "description": "Kiểm tra sức khỏe tổng quát.",
    "location": "Bệnh viện Hoàn Mỹ",
    "sT": "2025-07-05T01:00:00Z",
    "eT": "2025-07-05T03:00:00Z",
    "userId": 2
  },
  {
    "id": 15,
    "title": "Dọn dẹp nhà cửa",
    "description": "Tổng vệ sinh nhà cuối tuần.",
    "location": "Nhà riêng",
    "sT": "2025-07-06T02:00:00Z",
    "eT": "2025-07-06T05:00:00Z",
    "userId": 17
  },
  {
    "id": 16,
    "title": "Học nấu ăn",
    "description": "Tham gia lớp học nấu món Âu.",
    "location": "Trung tâm dạy nghề Bếp Vàng",
    "sT": "2025-07-10T11:00:00Z",
    "eT": "2025-07-10T14:00:00Z",
    "userId": 1
  },
  {
    "id": 17,
    "title": "Chơi cầu lông",
    "description": "Giao lưu cầu lông với đồng nghiệp.",
    "location": "Sân cầu lông Tinh Võ",
    "sT": "2025-07-12T12:00:00Z",
    "eT": "2025-07-12T13:30:00Z",
    "userId": 4
  },
  {
    "id": 18,
    "title": "Đi siêu thị mua đồ",
    "description": "Mua sắm thực phẩm và đồ dùng cá nhân.",
    "location": "Co.opmart Cống Quỳnh",
    "sT": "2025-07-13T09:00:00Z",
    "eT": "2025-07-13T10:30:00Z",
    "userId": 5
  },
  {
    "id": 19,
    "title": "Workshop làm gốm",
    "description": "Trải nghiệm tự tay làm gốm.",
    "location": "Xưởng gốm Bát Tràng Mini",
    "sT": "2025-07-19T07:00:00Z",
    "eT": "2025-07-19T10:00:00Z",
    "userId": 13
  },
  {
    "id": 20,
    "title": "Xem kịch nói",
    "description": "Thưởng thức vở kịch mới tại sân khấu.",
    "location": "Sân khấu kịch Idecaf",
    "sT": "2025-07-20T13:00:00Z",
    "eT": "2025-07-20T15:00:00Z",
    "userId": 2
  },
  {
    "id": 21,
    "title": "Leo núi nhân tạo",
    "description": "Thử thách bản thân với môn leo núi.",
    "location": "CLB Leo núi Vertical Academy",
    "sT": "2025-07-26T03:00:00Z",
    "eT": "2025-07-26T05:00:00Z",
    "userId": 4
  },
  {
    "id": 22,
    "title": "Tham quan bảo tàng",
    "description": "Tìm hiểu lịch sử tại Bảo tàng Lịch sử Việt Nam.",
    "location": "Bảo tàng Lịch sử Việt Nam",
    "sT": "2025-07-27T02:30:00Z",
    "eT": "2025-07-27T04:30:00Z",
    "userId": 1
  },
  {
    "id": 23,
    "title": "Làm tình nguyện cuối tuần",
    "description": "Tham gia hoạt động dọn dẹp công viên.",
    "location": "Công viên Gia Định",
    "sT": "2025-08-02T01:00:00Z",
    "eT": "2025-08-02T04:00:00Z",
    "userId": 5
  },
  {
    "id": 24,
    "title": "Đi dạo phố đi bộ",
    "description": "Thư giãn cuối ngày tại phố đi bộ Nguyễn Huệ.",
    "location": "Phố đi bộ Nguyễn Huệ",
    "sT": "2025-08-03T12:00:00Z",
    "eT": "2025-08-03T14:00:00Z",
    "userId": 13
  },
  {
    "id": 25,
    "title": "Học đàn Guitar",
    "description": "Buổi học Guitar hàng tuần.",
    "location": "Trung tâm âm nhạc Sol",
    "sT": "2025-08-07T12:30:00Z",
    "eT": "2025-08-07T14:00:00Z",
    "userId": 2
  },
  {
    "id": 26,
    "title": "Chuẩn bị thuyết trình",
    "description": "Soạn slide và nội dung cho buổi họp.",
    "location": "Nhà riêng",
    "sT": "2025-08-10T13:00:00Z",
    "eT": "2025-08-10T16:00:00Z",
    "userId": 17
  },
  {
    "id": 27,
    "title": "Câu cá giải trí",
    "description": "Thư giãn cuối tuần tại hồ câu.",
    "location": "Hồ câu cá giải trí Bình Quới",
    "sT": "2025-08-15T24:00:00Z",
    "eT": "2025-08-16T04:00:00Z",
    "userId": 4
  },
  {
    "id": 28,
    "title": "Tập Gym",
    "description": "Buổi tập thể hình hàng ngày.",
    "location": "California Fitness & Yoga",
    "sT": "2025-08-18T11:00:00Z",
    "eT": "2025-08-18T12:30:00Z",
    "userId": 1
  },
  {
    "id": 29,
    "title": "Tham dự Talkshow",
    "description": "Talkshow về chủ đề Khởi nghiệp.",
    "location": "Dreamplex Coworking Space",
    "sT": "2025-08-22T11:30:00Z",
    "eT": "2025-08-22T13:30:00Z",
    "userId": 5
  },
  {
    "id": 30,
    "title": "Mua sắm quần áo",
    "description": "Tìm mua vài bộ đồ mới.",
    "location": "Trung tâm thương mại Crescent Mall",
    "sT": "2025-08-24T07:00:00Z",
    "eT": "2025-08-24T09:00:00Z",
    "userId": 13
  }
];
let quantity = events.length;

const addPE = (req) => {
  const { event } = req.body;
  // console.log(req);
  // console.log(data);
  // const query = {...data};
  // console.log(query);
  ++quantity;
  event.id = quantity;
  const query = {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    sT: event.startTime,
    eT: event.endTime,
    userId: event.user.id
  }

  events.push(query);
  return event.id;
}

const findPEById = (id) => {
  const event_id = Number(id);
  if (isNaN(event_id)) return null;
  const found = events.find(item => item.id === event_id);
  if (!found) return null;

  const result = new PersonalEvent(found.title, found.description, found.location, found.sT, found.eT, getUserById(found.userId));
  result.id = found.id;
  return result.toJSON();
}

const findPEByUserId = (id) => {
  const user_id = Number(id);
  if (isNaN(user_id)) return [];

  const user = getUserById(user_id);
  const found = events.filter(item => item.userId === user_id);
  // console.log(found);
  const result = found.map((item) => {
    const event = new PersonalEvent(item.title, item.description, item.location, item.sT, item.eT, user);
    event.id = item.id;
    return event.toJSON();
  })
  return result;
}

const normalizeText = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const findPEByName = (key, user_id) => {
  const userId = Number(user_id);
  if (isNaN(userId)) return [];
  // console.log(lc_key, userId);
  const result = events
    .filter(item => (normalizeText(item.title).includes(normalizeText(key)) && item.userId === userId))
    .map((item) => {
      const event = new PersonalEvent(item.title, item.description, item.location, item.sT, item.eT, getUserById(item.userId));
      event.id = item.id;
      return event.toJSON();
    })
  console.log(result);
  return result;
}

const updatePE = (event) => {
  const event_id = Number(event.id);
  if (isNaN(event_id)) return false;
  const found = events.find(item => item.id === event_id);
  if (!found) return false;

  found.title = event.title;
  found.description = event.description;
  found.location = event.location;
  found.sT = event.startTime;
  found.eT = event.endTime;

  // console.log(events.find(item => item.id === event_id));
  return true;

}

export { addPE, findPEById, findPEByUserId, findPEByName, updatePE };