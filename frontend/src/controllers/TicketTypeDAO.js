import TicketType from "../models/TicketType";
import { findTicketByTicketTypeId, addTicket } from "./TicketDAO";
import { findCEById } from "./CommunityEventDAO";
const ticketTypes = [
    {
        id: 1,
        name: "Vé Thường",
        price: 500000,
        quantity: 200,
        soldAmount: 156,
        CommunityEventId: 202
    },
    {
        id: 2,
        name: "Vé VIP",
        price: 1500000,
        quantity: 50,
        soldAmount: 28,
        CommunityEventId: 202
    },
    {
        id: 3,
        name: "Vé Phổ thông",
        price: 200000,
        quantity: 300,
        soldAmount: 245,
        CommunityEventId: 204
    },
    {
        id: 4,
        name: "Vé Premium",
        price: 500000,
        quantity: 100,
        soldAmount: 82,
        CommunityEventId: 204
    },
    {
        id: 5,
        name: "Vé Gia đình",
        price: 800000,
        quantity: 50,
        soldAmount: 31,
        CommunityEventId: 204
    },
    {
        id: 6,
        name: "Vé 5km",
        price: 300000,
        quantity: 1000,
        soldAmount: 687,
        CommunityEventId: 207
    },
    {
        id: 7,
        name: "Vé 10km",
        price: 500000,
        quantity: 500,
        soldAmount: 423,
        CommunityEventId: 207
    },
    {
        id: 8,
        name: "Vé 21km",
        price: 700000,
        quantity: 200,
        soldAmount: 158,
        CommunityEventId: 207
    },
    {
        id: 9,
        name: "Vé Cá nhân",
        price: 150000,
        quantity: 150,
        soldAmount: 98,
        CommunityEventId: 212
    },
    {
        id: 10,
        name: "Vé Nhóm",
        price: 500000,
        quantity: 20,
        soldAmount: 12,
        CommunityEventId: 212
    }
];

let last_id = ticketTypes.length;

const addTicketType = ({ name, price, quantity, event_id }) => {
    const query = {
        name: name,
        price: Number(price),
        quantity: Number(quantity),
        soldAmount: 0,
        CommunityEventId: event_id,
    };
    ++last_id;
    query.id = last_id;
    // console.log(query);
    ticketTypes.push(query);
    return last_id;
}

const findTicketTypeByEventId = (eid) => {
    const event_id = Number(eid);
    if (isNaN(event_id)) return [];

    const result = ticketTypes
        .filter(item => item.CommunityEventId === event_id)
        .map(item => {
            const ticketType = new TicketType(item.name, item.price, item.quantity, item.soldAmount, findTicketByTicketTypeId(item.id));
            ticketType.id = item.id;
            return ticketType;
        })
    // console.log('res', result)
    return result;
}

const deleteTicketTypeByEventId = eid => {
    const event_id = Number(eid);

    const found = ticketTypes.filter(item => item.CommunityEventId === event_id);
    found.forEach(item => item.quantity = item.soldAmount);

    // console.log(ticketTypes);
}

const updateTicketType = ticketType => {
    const found = ticketTypes.find(item => item.id === ticketType.id);

    if (!found) return;
    found.quantity = ticketType.quantity;
}


const findTicketTypeById = (id) => {
    const ID = Number(id);
    if (isNaN(ID)) return [];

    const found = ticketTypes.find(item => item.id === ID);
    const result = new TicketType(found.name, found.price, found.quantity, found.soldAmount, findTicketByTicketTypeId(found.id));
    result.id = found.id;
    // console.log('res', result)
    return result;
}

const joinCommunityEventOnTicketTypeId = ticketTypeId => {
    const found = ticketTypes.find(item => item.id === ticketTypeId);
    const result = found ? findCEById(found.CommunityEventId, false, true) : null;
    // console.log(result);
    return result;
}

const payedTicketType = ({ id, amount, OrderId, eventId }) => {
    const found = ticketTypes.find(item => item.id === id);

    if (!found) return false;
    if (found.soldAmount + amount > found.quantity) return false;


    for (let i = 0; i < amount; ++i)
        addTicket({ price: found.price, TicketTypeId: id, OrderId: OrderId, eventId: eventId });

    found.soldAmount += amount;
    return true;
}

export { addTicketType, findTicketTypeByEventId, deleteTicketTypeByEventId, updateTicketType, findTicketTypeById, joinCommunityEventOnTicketTypeId, payedTicketType };
