class Ticket {
    #id;
    #code;
    #checkedAt;

    constructor(code, checkedAt) {
        this.#code = code;
        this.#checkedAt = checkedAt;
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
}

export default Ticket;