class CommunityEvent {
    #id;
    #title;
    #description;
    #location;
    #startTime;
    #endTime;
    #status;
    #isFree;
    #createdAt;
    #ticketTypes;

    constructor(title, description, location, startTime, endTime, status, isFree, createdAt, ticketTypes) {
        this.#title = title;
        this.#description = description;
        this.#location = location;
        this.#startTime = startTime;
        this.#endTime = endTime;
        this.#status = status;
        this.#isFree = isFree;
        this.#createdAt = createdAt;
        this.#ticketTypes = ticketTypes;
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

    get status() {
        return this.#status;
    }

    set status(value) {
        this.#status = value;
    }

    get isFree() {
        return this.#isFree;
    }

    set isFree(value) {
        this.#isFree = value;
    }

    get createdAt() {
        return this.#createdAt;
    }

    set createdAt(value) {
        this.#createdAt = value;
    }

    get ticketTypes() {
        return this.#ticketTypes;
    }

    set ticketTypes(value) {
        this.#ticketTypes = value;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            location: this.#location,
            startTime: this.#startTime,
            endTime: this.#endTime,
            status: this.#status,
            isFree: this.#isFree,
            createdAt: this.#createdAt,
            ticketTypes: this.#ticketTypes
        };
    }
}

export default CommunityEvent;