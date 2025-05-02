class TicketType {
    #id;
    #name;
    #price;
    #quantity;
    #soldAmount;
    #tickets;

    constructor(name, price, quantity, soldAmount, tickets) {
        this.#name = name;
        this.#price = price;
        this.#quantity = quantity;
        this.#soldAmount = soldAmount;
        this.#tickets = tickets;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        this.#price = value;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        this.#quantity = value;
    }

    get soldAmount() {
        return this.#soldAmount;
    }

    set soldAmount(value) {
        this.#soldAmount = value;
    }

    get tickets() {
        return this.#tickets;
    }

    set tickets(value) {
        this.#tickets = value;
    }

}