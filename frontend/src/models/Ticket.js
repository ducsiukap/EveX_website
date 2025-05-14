class Ticket {
    #id;
    #code;
    #checkedAt;
    #price;

    constructor(code, checkedAt, price) {
        this.#code = code;
        this.#checkedAt = checkedAt;
        this.#price = price;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get code() {
        return this.#code;
    }

    set code(value) {
        this.#code = value;
    }

    get checkedAt() {
        return this.#checkedAt;
    }

    set checkedAt(value) {
        this.#checkedAt = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        this.#price = value;
    }

    toJSON() {
        return {
            id: this.#id,
            code: this.#code,
            checkedAt: this.#checkedAt,
            price: this.#price
        };
    }
}

export default Ticket;