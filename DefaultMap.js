const data = Symbol("data");

// extending built-in classes does not work in babel
export default class extends Map {
    constructor(def, iterable) {
        super(iterable);
        if (def === undefined) {
            throw new Error("DefaultMap: no default defined");
        }
        this[data] = def;
    }
    get(key) {
        if (!this.has(key)) {
            return this[data];
        }
        return super.get(key);
    }
    get default() {
        return this[data];
    }
}
