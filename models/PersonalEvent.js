export default class PersonalEvent {
    #id;
    #title;
    #description;
    #location;
    #startTime;
    #endTime;

    constructor(title, description, location, startTime, endTime) {
        this.#title = title;
        this.#description = description;
        this.#location = location;
        this.#startTime = startTime;
        this.#endTime = endTime;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get location() {
        return this.#location;
    }

    set location(value) {
        this.#location = value;
    }

    get startTime() {
        return this.#startTime;
    }

    set startTime(value) {
        this.#startTime = value;
    }

    get endTime() {
        return this.#endTime;
    }

    set endTime(value) {
        this.#endTime = value;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            location: this.#location,
            startTime: this.#startTime,
            endTime: this.#endTime
        };
    }
}