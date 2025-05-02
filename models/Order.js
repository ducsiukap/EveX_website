export default class Order {
    #id; 
    #orderTime;
    #totalAmount;
    #discountAmount;
    #finalAmount;
    #user;
    #voucher;
    #tickets

    constructor(orderTime, totalAmount, discountAmount, finalAmount, user, voucher, tickets) {
        this.#orderTime = orderTime;
        this.#totalAmount = totalAmount;
        this.#discountAmount = discountAmount;
        this.#finalAmount = finalAmount;
        this.#user = user;
        this.#voucher = voucher;
        this.#tickets = tickets
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get orderTime() {
        return this.#orderTime;
    }

    set orderTime(value) {
        this.#orderTime = value;
    }

    get totalAmount() {
        return this.#totalAmount;
    }

    set totalAmount(value) {
        this.#totalAmount = value;
    }

    get discountAmount() {
        return this.#discountAmount;
    }

    set discountAmount(value) {
        this.#discountAmount = value;
    }

    get finalAmount() {
        return this.#finalAmount;
    }

    set finalAmount(value) {
        this.#finalAmount = value;
    }

    get user() {
        return this.#user;
    }

    set user(value) {
        this.#user = value;
    }

    get voucher() {
        return this.#voucher;
    }

    set voucher(value) {
        this.#voucher = value;
    }

    get tickets() {
        return this.#tickets;
    }

    set tickets(value) {
        this.#tickets = value;
    }

    toJSON() {
        return {
            id: this.#id,
            orderTime: this.#orderTime,
            totalAmount: this.#totalAmount,
            discountAmount: this.#discountAmount,
            finalAmount: this.#finalAmount,
            user: this.#user,
            voucher: this.#voucher,
            tickets: this.#tickets
        };
    }
}