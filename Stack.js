const data = Symbol("data");

export default class {
    constructor(iterable) {
        this[data] = [];
        if (iterable) {
            for (const item of iterable) {
                this.push(item);
            }
        }
    }
    push(item) {
        this[data].push(item);
        return this;
    }
    pop() {
        return this[data].pop();
    }
    peek() {
        return this[data][this[data].length - 1];
    }
    clear() {
        this[data] = [];
    }
    get size() {
        return this[data].length;
    }
    forEach(callback, thisArg) {
        if (thisArg) {
            for (const item of this) {
                callback.call(thisArg, item, this);
            }
        } else {
            for (const item of this) {
                callback(item, this);
            }
        }
    }
    *[Symbol.iterator]() {
        for (let i = this[data].length - 1; i >= 0; i--) {
            yield this[data][i];
        }
    }
}
