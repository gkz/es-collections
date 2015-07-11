const data = Symbol("data");

export default class {
    constructor(iterable) {
        this[data] = [];
        if (iterable) {
            for (const item of iterable) {
                this.enqueue(item);
            }
        }
    }
    enqueue(item) {
        this[data].push(item);
        return this;
    }
    dequeue() {
        return this[data].shift();
    }
    peek() {
        return this[data][0];
    }
    clear() {
        this[data] = [];
    }
    has(item) {
        for(let i = 0; i < this.size; i++) {
            if (item === this[data][i]) {
                return true;
            }
        }
        return false;
    }
    get size() {
        return this[data].length;
    }
    forEach(callback, thisArg) {
        for (const item of this) {
            callback.call(thisArg, item, this);
        }
    }
    *[Symbol.iterator]() {
        for (let i = 0; i < this.size; i++) {
            yield this[data][i];
        }
    }
}
