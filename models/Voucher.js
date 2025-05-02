export default class Voucher {
    #id;
    #code;
    #description;
    #type;
    #value; 
    #quantity;
    #startAt;
    #endAt;
    #status;

    constructor(code, description, type, value, quantity, startAt, endAt, status) {
        this.#code = code;
        this.#description = description;
        this.#type = type;
        this.#value = value;
        this.#quantity = quantity;
        this.#startAt = startAt;
        this.#endAt = endAt;
        this.#status = status;
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

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        this.#type = value;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        this.#quantity = value;
    }

    get startAt() {
        return this.#startAt;
    }

    set startAt(value) {
        this.#startAt = value;
    }

    get endAt() {
        return this.#endAt;
    }

    set endAt(value) {
        this.#endAt = value;
    }

    get status() {
        return this.#status;
    }

    set status(value) {
        this.#status = value;
    }

    toJSON() {
        return {
            id: this.#id,
            code: this.#code,
            description: this.#description,
            type: this.#type,
            value: this.#value,
            quantity: this.#quantity,
            startAt: this.#startAt,
            endAt: this.#endAt,
            status: this.#status
        };
    }
}