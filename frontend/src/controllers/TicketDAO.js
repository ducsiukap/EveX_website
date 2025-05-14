import Ticket from '../models/Ticket';
import { findTicketTypeById, joinCommunityEventOnTicketTypeId } from './TicketTypeDAO';

const genRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; ++i) {
        const randInt = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randInt);
    }
    return result;
}

const codeMap = new Map();

const genCode = (eventId) => {
    if (!codeMap.has(eventId)) codeMap.set(eventId, new Set());

    const eventCodeMap = codeMap.get(eventId);

    let code = '';
    do {
        code = `${genRandomString(4)} ${genRandomString(4)}`
    } while (eventCodeMap.has(code));

    eventCodeMap.add(code);
    return code;
}

const ticketTypes = [
    {
        id: 1,
        price: 500000,
        soldAmount: 156,
        CommunityEventId: 202
    },
    {
        id: 2,
        price: 1500000,
        soldAmount: 28,
        CommunityEventId: 202
    },
    {
        id: 3,
        price: 200000,
        soldAmount: 245,
        CommunityEventId: 204
    },
    {
        id: 4,
        price: 500000,
        soldAmount: 82,
        CommunityEventId: 204
    },
    {
        id: 5,
        price: 800000,
        soldAmount: 31,
        CommunityEventId: 204
    },
    {
        id: 6,
        price: 300000,
        soldAmount: 687,
        CommunityEventId: 207
    },
    {
        id: 7,
        price: 500000,
        soldAmount: 423,
        CommunityEventId: 207
    },
    {
        id: 8,
        price: 700000,
        soldAmount: 158,
        CommunityEventId: 207
    },
    {
        id: 9,
        price: 150000,
        soldAmount: 98,
        CommunityEventId: 212
    },
    {
        id: 10,
        price: 500000,
        soldAmount: 12,
        CommunityEventId: 212
    }
];
const events = [
    {
        id: 201,
        sT: "2025-06-15T01:00:00Z",
        OrganizationUserId: 6
    }, 
    // edit
    {
        id: 202,
        sT: "2025-05-14T01:30:00Z",
        OrganizationUserId: 7
    },
    {
        id: 203,
        sT: "2025-05-25T01:00:00Z",
        OrganizationUserId: 6
    },
    {
        id: 204,
        sT: "2025-05-17T12:00:00Z",
        OrganizationUserId: 9
    },
    {
        id: 205,
        sT: "2025-05-11T00:30:00Z",
        OrganizationUserId: 10
    },
    {
        id: 206,
        sT: "2025-04-20T02:00:00Z",
        OrganizationUserId: 15
    },
    // test statistic
    {
        id: 207,
        sT: "2025-04-09T22:00:00Z",
        OrganizationUserId: 6
    },
    {
        id: 208,
        sT: "2025-05-09T06:30:00Z",
        OrganizationUserId: 7
    },
    {
        id: 209,
        sT: "2025-04-26T02:00:00Z",
        OrganizationUserId: 9
    },
    {
        id: 210,
        sT: "2025-09-01T03:00:00Z",
        OrganizationUserId: 15
    },
    {
        id: 211,
        sT: "2025-05-31T12:00:00Z",
        OrganizationUserId: 9
    },
    {
        id: 212,
        sT: "2025-06-07T07:00:00Z",
        OrganizationUserId: 15
    },
    {
        id: 213,
        sT: "2025-06-22T00:00:00Z",
        OrganizationUserId: 10
    },
    {
        id: 214,
        sT: "2025-08-23T01:00:00Z",
        OrganizationUserId: 7
    },
    {
        id: 215,
        sT: "2025-05-03T03:00:00Z",
        OrganizationUserId: 6
    },
    {
        id: 216,
        sT: "2025-09-10T03:00:00Z",
        OrganizationUserId: 17
    },
    {
        id: 217,
        sT: "2025-05-01T02:00:00Z",
        OrganizationUserId: 10
    },
    {
        id: 218,
        sT: "2025-12-20T11:00:00Z",
        OrganizationUserId: 15
    }
];

const tickets = [];
let next_id = 1;
ticketTypes.forEach((item) => {
    const qtt = item.soldAmount;
    const event_date = new Date(events.find(event => event.id === item.CommunityEventId).sT).toISOString();
    const today = new Date().toISOString();

    if (event_date > today) {
        for (let i = 0; i < qtt; ++i) {
            const query = {
                id: next_id,
                code: genCode(item.id),
                checkedAt: '',
                price: item.price,
                TicketTypeId: item.id,
                OrderId: -1
            }
            tickets.push(query);
            ++next_id;
        }
    } else {
        for (let i = 1; i <= qtt; ++i) {
            const query = {
                id: next_id,
                code: genCode(item.id),
                checkedAt: Math.random() > 0.2 ? event_date : '',
                price: item.price,
                TicketTypeId: item.id,
                OrderId: -1
            }
            tickets.push(query);
            ++next_id;
        }
    }
})

//personal: 1 (1, 2, 7, 10), 2, 3(3), 4(4), 5(5), 13(6), 14(8), 16(9)
// event: 202 (1-156, 2-184), 204(3-429, 4-511, 5-542), 
//   207(6-1229, 7-1652, 8-1810), 212 (9-1908, 10-1920)
tickets[1].OrderId = 1;
tickets[2].OrderId = 1;
tickets[3].OrderId = 1;
tickets[185].OrderId = 2;
tickets[1230].OrderId = 7;
tickets[1909].OrderId = 10;

tickets[4].OrderId = 3;

tickets[5].OrderId = 4;

tickets[1811].OrderId = 5;
tickets[1812].OrderId = 5;

tickets[512].OrderId = 6;

tickets[1777].OrderId = 8;
tickets[1778].OrderId = 8;

tickets[10].OrderId = 9;

const findTicketByTicketTypeId = ticketId => {
    const tt_id = Number(ticketId);
    if (isNaN(tt_id)) return [];

    const result = tickets
        .filter(item => item.TicketTypeId === tt_id)
        .map(item => {
            const ticket = new Ticket(item.code, item.checkedAt, item.price);
            ticket.id = item.id;
            return ticket;
        })

    return result;
}

const findTicketByOrderId = orderId => {
    const result =
        tickets.filter(item => item.OrderId === orderId)
            .map(item => {
                const ticket = new Ticket(item.code, item.checkedAt, item.price);
                ticket.id = item.id;
                return ticket;
            })

    return result;
}

const joinTicketTypeOnTicketId = ticketId => {
    const found = tickets.find(item => item.id === ticketId);
    if (!found) return null;
    const result = findTicketTypeById(found.TicketTypeId);
    // console.log('result - ', result);
    return result;
}

const checkTicket = (code, eventId) => {
    const found = tickets.find(item => item.code === code);

    if (!found) return { valid: false, status: 'Vé không tồn tại' };
    const event = joinCommunityEventOnTicketTypeId(found.TicketTypeId);
    if (event.id !== eventId) return { valid: false, status: 'Vé không tồn tại' };
    if (found.checkedAt) return { valid: false, status: `Vé đã được checkin tại thời điểm ${new Date(found.checkedAt).toLocaleString('vi-VN')}!` };

    const now = new Date();
    if (now > new Date(event.endTime)) return { valid: false, status: 'Sự kiện đã kết thúc!' };

    found.checkedAt = now;
    return { valid: true, status: 'Checkin thành công' };
}

export { findTicketByTicketTypeId, findTicketByOrderId, joinTicketTypeOnTicketId, checkTicket };

