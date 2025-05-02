export default class User {
    #id;
    #name; 
    #email; 
    #password; 
    #phone;
    #status;

    constructor(name, email, password, phone, status) {
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#phone = phone;
        this.#status = status;
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

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get password() {
        return this.#password;
    }

    set password(value) {
        this.#password = value;
    }

    get phone() {
        return this.#phone;
    }

    set phone(value) {
        this.#phone = value;
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
            name: this.#name,
            email: this.#email,
            phone: this.#phone,
            status: this.#status
        };
    }
}