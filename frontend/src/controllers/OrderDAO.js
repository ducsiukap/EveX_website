import Order from '../models/Order';
import { findTicketByOrderId, joinTicketTypeOnTicketId } from './TicketDAO';
import { getVoucherById, takeVoucher } from './VoucherDAO';
import { getUserById } from './UserDAO';
import { joinCommunityEventOnTicketTypeId, payedTicketType } from './TicketTypeDAO';
//personal: 1 (1, 2, 7, 10), 2, 3(3), 4(4), 5(5), 13(6), 14(8), 16(9)
const orders = [
    {
        id: 1,
        orderTime: "2025-05-06T10:15:00Z",
        userID: 1,
        voucherId: 7 // GIAMNGAY20K
    },
    {
        id: 2,
        orderTime: "2025-05-20T14:30:00Z",
        userID: 1,
        voucherId: 2 // GIAM30K
    },
    {
        id: 3,
        orderTime: "2025-06-10T09:00:00Z",
        userID: 3,
        voucherId: 1 // CHAOHE20
    },
    {
        id: 4,
        orderTime: "2025-06-25T20:45:00Z",
        userID: 4,
        voucherId: 5 // TECHVIP
    },
    {
        id: 5,
        orderTime: "2025-05-09T18:10:00Z",
        userID: 5,
        voucherId: 6 // CUOITUAN10
    },
    {
        id: 6,
        orderTime: "2025-07-10T11:20:00Z",
        userID: 13,
        voucherId: 10 // TRIAN10
    },
    {
        id: 7,
        orderTime: "2025-07-15T19:00:00Z",
        userID: 1,
        voucherId: 5 // TECHVIP
    },
    {
        id: 8,
        orderTime: "2025-06-18T13:05:00Z",
        userID: 14,
        voucherId: 4 // BANMOI15
    },
    {
        id: 9,
        orderTime: "2025-05-02T07:30:00Z",
        userID: 16,
        voucherId: 8 // SINHNHAT5
    },
    {
        id: 10,
        orderTime: "2025-05-28T16:45:00Z",
        userID: 1,
        voucherId: 2 // GIAM30K
    }
];

let next_id = 11;

const findUserOrder = (userId) => {
    const uid = Number(userId);
    if (isNaN(uid)) return [];

    const user = getUserById(uid);
    if (!user) return [];

    const Orders = orders.filter(item => item.userID === uid);
    if (!Orders) return [];

    const result = Orders.map(order => {
        const tickets = findTicketByOrderId(order.id);

        const event = joinCommunityEventOnTicketTypeId(joinTicketTypeOnTicketId(tickets[0].id).id);

        let totalAmount = 0;
        tickets.forEach(item => totalAmount += item.price);

        const voucher = order.voucherId ? getVoucherById(order.voucherId) : null;
        let discountAmount = 0;
        if (voucher) {
            switch (voucher.type) {
                case 'fixed':
                    discountAmount = Math.min(totalAmount, voucher.value);
                    break;
                case 'percent':
                    discountAmount = totalAmount * voucher.value / 100;
                    break;
                default:
            }
        }

        const finalAmount = totalAmount - discountAmount;

        const resultOrder = new Order(order.orderTime, totalAmount, discountAmount, finalAmount, user, voucher, tickets);
        resultOrder.id = order.id;

        return { order: resultOrder, event: event };
    })

    // console.log(result);
    return result;
}

const normalizeText = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const findOrderByName = (key, userId) => {
    const userOrder = findUserOrder(userId);
    const title_key = normalizeText(key);
    // console.log(userOrder);
    const result = userOrder.filter(item =>
        normalizeText(item.event.title).includes(title_key)
    )

    return result;
}

const getOrderById = (id) => {
    const oid = Number(id);
    if (isNaN(oid)) return null;

    const order = orders.find(item => item.id === oid);
    if (!order) return null;

    const tickets = findTicketByOrderId(order.id);

    const event = joinCommunityEventOnTicketTypeId(joinTicketTypeOnTicketId(tickets[0].id).id);

    let totalAmount = 0;
    tickets.forEach(item => totalAmount += item.price);

    const voucher = order.voucherId ? getVoucherById(order.voucherId) : null;
    let discountAmount = 0;
    if (voucher) {
        switch (voucher.type) {
            case 'fixed':
                discountAmount = Math.min(totalAmount, voucher.value);
                break;
            case 'percent':
                discountAmount = totalAmount * voucher.value / 100;
                break;
            default:
        }
    }

    const finalAmount = totalAmount - discountAmount;

    const user = getUserById(order.userID);
    const resultOrder = new Order(order.orderTime, totalAmount, discountAmount, finalAmount, user, voucher, tickets);
    resultOrder.id = order.id;

    return { order: resultOrder, event: event };
}
/*
{
        id: 10,
        orderTime: "2025-05-28T16:45:00Z",
        userID: 1,
        voucherId: 2 // GIAM30K
    }
*/
const addOrder = (data) => {
    const { body } = data;
    // console.log(body);
    const query = { id: next_id, userID: body.order.userID, orderTime: (new Date().toISOString()) };

    if (!body.order.voucherId || takeVoucher({ id: body.order.voucherId })) {
        query.voucherId = body.order.voucherId;
    } else return -1;

    body.ticketTypes.forEach((item) => {
        if (!payedTicketType({ id: item.id, amount: item.amount, OrderId: query.id, eventId: data.eventId }))
            return -2;
        // rollback
    })

    orders.push(query);
    ++next_id;

    // console.log(query);
    return next_id - 1;
}

export { findOrderByName, getOrderById, addOrder };
