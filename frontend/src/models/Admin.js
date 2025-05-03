import User from "./User";

export default class Admin extends User {
    #vouchers;

    constructor(name, email, password, phone, status, vouchers) {
        super(name, email, password, phone, status);
        this.#vouchers = vouchers;
    }

    get vouchers() {
        return this.#vouchers;
    }

    set vouchers(vouchers) {
        this.#vouchers = vouchers;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            vouchers: this.#vouchers
        };
    }
}