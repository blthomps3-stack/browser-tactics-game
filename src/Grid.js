export class GridPoint {
    #neighbors = [];
    #contains;

    constructor() {
        this.#contains = 0; // empty by default
    }

    get neighbors() { return this.#neighbors; }
    set contains(obj) { this.#contains = obj; }
    get contains() { return this.#contains; }
}