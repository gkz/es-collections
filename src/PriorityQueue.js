function heapify(data, compareFunction) {
    for (let i = Math.floor((data.length - 2) / 2); i >= 0; i--) {
        sink(data, compareFunction, i);
    }
    return data;
}

function bubbleUp(data, compareFunction, index) {
    const value = data[index];

    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = data[parentIndex];
        if (compareFunction(value, parent) < 0) {
            data[index] = parent;
        } else {
            break;
        }
        index = parentIndex;
    }
    data[index] = value;
    return index;
}

function sink(data, compareFunction, index) {
    const value = data[index];
    const size = data.length;

    while (2 * index + 1 < size) {
        let targetIndex = 2 * index + 1;
        if (targetIndex < size - 1
                && compareFunction(data[targetIndex + 1], data[targetIndex]) < 0) {
            targetIndex++;
        }
        if (compareFunction(data[index], data[targetIndex]) <= 0) {
            break;
        }
        data[index] = data[targetIndex];
        index = targetIndex;
    }
    data[index] = value;
    return index;
}

const data = Symbol("data");
const comp = Symbol("compareFunction");

export default class PriorityQueue {
    static newNaturalMin(iterator) {
        return new PriorityQueue((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }, iterator);
    }
    static newNaturalMax(iterator) {
        return new PriorityQueue((a, b) => {
            if (a < b) {
                return 1;
            }
            if (a > b) {
                return -1;
            }
            return 0;
        }, iterator);
    }
    constructor(compareFunction, iterable) {
        if (typeof compareFunction !== "function") {
            throw new Error("PriorityQueue: no compareFunction defined");
        }
        this[comp] = compareFunction;

        if (iterable === undefined) {
            this[data] = [];
        } else {
            this[data] = heapify(Array.from(iterable), compareFunction);
        }
    }
    add(item) {
        this[data].push(item);
        bubbleUp(this[data], this[comp], this.size - 1);
        return this;
    }
    peek() {
        return this[data][0];
    }
    remove() {
        const output = this[data][0];
        if (this.size > 1) {
            this[data][0] = this[data].pop();
            sink(this[data], this[comp], 0);
        } else {
            this[data].pop();
        }
        return output;
    }
    delete(item) {
        for (let i = 0; i < this.size - 1; i++) {
            if (this[comp](item, this[data][i]) === 0) {
                this[data][i] = this[data].pop();
                const newIndex = bubbleUp(this[data], this[comp], i);
                sink(this[data], this[comp], newIndex);
                return true;
            }
        }
        if (this[comp](this[data][this.size - 1], item) === 0) {
            this[data].pop();
            return true;
        }
        return false;
    }
    clear() {
        this[data] = [];
    }
    has(item) {
        for(let i = 0; i < this.size; i++) {
            if (this[comp](item, this[data][i]) === 0) {
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
