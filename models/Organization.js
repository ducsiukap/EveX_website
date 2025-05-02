import User from "./User";

export default class Organization extends User {
    #events;
    constructor (name, email, password, phone, status, events) {
        super(name, email, password, phone, status);
        this.#events = events;
    }

    get events() {
        return this.#events;
    }

    set events(events) {
        this.#events = events;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            events: this.#events
        };
    }
}