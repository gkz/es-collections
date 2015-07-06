// extending built-in classes does not work in babel
export default class SetPlus extends Set {
    intersection(other) {
        const output = new SetPlus();
        for (const item of this) {
            if (other.has(item)) {
                output.add(item);
            }
        }
        return output;
    }
    union(other) {
        const output = new SetPlus(this);
        for (const item of other) {
            output.add(item);
        }
        return output;
    }
    difference(other) {
        const output = new SetPlus(this);
        for (const item of other) {
            output.remove(item);
        }
        return output;
    }
}
