export default class Report {
    #id;
    #createdAt;
    #reason;
    #status;
    #response;
    #user;
    #event;

    constructor(createdAt, reason, status, response, user, event) {
        this.#createdAt = createdAt;
        this.#reason = reason;
        this.#status = status;
        this.#response = response;
        this.#user = user;
        this.#event = event;
    }q

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get createdAt() {
        return this.#createdAt;
    }

    set createdAt(value) {
        this.#createdAt = value;
    }

    get reason() {
        return this.#reason;
    }

    set reason(value) {
        this.#reason = value;
    }

    get status() {
        return this.#status;
    }

    set status(value) {
        this.#status = value;
    }

    get response() {
        return this.#response;
    }

    set response(value) {
        this.#response = value;
    }

    get user() {
        return this.#user;
    }

    set user(value) {
        this.#user = value;
    }

    get event() {
        return this.#event;
    }

    set event(value) {
        this.#event = value;
    }

    toJSON() {
        return {
            id: this.#id,
            createdAt: this.#createdAt,
            reason: this.#reason,
            status: this.#status,
            response: this.#response,
            user: this.#user.toJSON(),
            event: this.#event.toJSON()
        };
    }
}

