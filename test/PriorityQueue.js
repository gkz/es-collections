import {strictEqual as equal, throws} from "assert";
import PriorityQueue from "../PriorityQueue";

suite("PriorityQueue", () => {
    test("new, no comparator", () => {
        throws(() => new PriorityQueue(), "PriorityQueue: no comparator function defined");
    });
    test("new with comparator", () => {
        const q = new PriorityQueue((a, b) => a - b);
        q.add(3);
        q.add(1);
        q.add(2);
        equal(q.size, 3);
        equal(q.remove(), 1);
        equal(q.remove(), 2);
        equal(q.remove(), 3);
    });
    test("new with iterator", () => {
        const q = new PriorityQueue((a, b) => a - b, [3, 1, 2]);
        equal(q.size, 3);
        equal(q.remove(), 1);
        equal(q.remove(), 2);
        equal(q.remove(), 3);
    });
    test("natural min", () => {
        const q = PriorityQueue.newNaturalMin();
        q.add(3);
        q.add(1);
        q.add(2);
        q.add(4);
        q.add(1);
        equal(q.size, 5);
        equal(q.remove(), 1);
        equal(q.remove(), 1);
        equal(q.remove(), 2);
        equal(q.remove(), 3);
        equal(q.remove(), 4);
        equal(q.size, 0);
    });
    test("natural max", () => {
        const q = PriorityQueue.newNaturalMax();
        q.add(3);
        q.add(1);
        q.add(2);
        q.add(4);
        q.add(1);
        equal(q.size, 5);
        equal(q.remove(), 4);
        equal(q.remove(), 3);
        equal(q.remove(), 2);
        equal(q.remove(), 1);
        equal(q.remove(), 1);
        equal(q.size, 0);
    });
    test("objects as items", () => {
        const q = new PriorityQueue((a, b) => a.val - b.val);
        q.add({val: 4});
        q.add({val: 3});
        q.add({val: 2});
        q.add({val: 1});
        equal(q.size, 4);
        equal(q.remove().val, 1);
        equal(q.remove().val, 2);
        equal(q.remove().val, 3);
        equal(q.remove().val, 4);
        equal(q.size, 0);
    });
    test("equal items", () => {
        const q = PriorityQueue.newNaturalMin();
        q.add(2);
        q.add(1);
        q.add(1);
        equal(q.size, 3);
        equal(q.remove(), 1);
        equal(q.remove(), 1);
        equal(q.remove(), 2);
    });
    test("chained add", () => {
        const q = PriorityQueue.newNaturalMin();
        q.add(3).add(1);
        equal(q.size, 2);
        equal(q.remove(), 1);
        equal(q.remove(), 3);
    });
    test("remove empty", () => {
        const q = PriorityQueue.newNaturalMin();
        equal(q.size, 0);
        equal(q.remove(), undefined);
        q.add(1);
        equal(q.remove(), 1);
        equal(q.remove(), undefined);
        equal(q.size, 0);
    });
    test("peek", () => {
        const q = PriorityQueue.newNaturalMin();
        q.add(1);
        equal(q.size, 1);
        equal(q.peek(), 1);
        equal(q.size, 1);
    });
    test("peek empty", () => {
        const q = PriorityQueue.newNaturalMin();
        equal(q.size, 0);
        equal(q.peek(), undefined);
    });
    test("delete", () => {
        const q = PriorityQueue.newNaturalMin([5, 4, 3, 2, 1]);
        equal(q.size, 5);
        equal(q.peek(), 1);
        equal(q.delete(3), true);
        equal(q.size, 4);
        equal(q.delete(9), false);
        equal(q.size, 4);
        equal(q.delete(1), true);
        equal(q.size, 3);
        equal(q.peek(), 2);
        equal(q.delete(5), true);
        equal(q.size, 2);
        equal(q.delete(4), true);
        equal(q.delete(2), true);
        equal(q.size, 0);
    });
    test("clear", () => {
        const q = PriorityQueue.newNaturalMin();
        q.add(1);
        equal(q.size, 1);
        q.clear();
        equal(q.size, 0);
    });
    test("has", () => {
        const q = new PriorityQueue((a, b) => a - b, [1, 2, 3]);
        equal(q.has(2), true);
        equal(q.has(4), false);
    });
    test("has with objects", () => {
        const q = new PriorityQueue(
            (a, b) => a.val - b.val,
            [{val: 1}, {val: 2}, {val: 3}]
        );
        equal(q.has({val: 2}), true);
        equal(q.has({val: 4}), false);
    });
    test("forEach", () => {
        const q = PriorityQueue.newNaturalMin([1, 2, 3]);
        let sum = 0;
        q.forEach(function(item, entireQueue) {
            sum += item;
            equal(entireQueue, q);
        });
        equal(sum, 6);
    });
    test("forEach with thisArg", () => {
        const q = PriorityQueue.newNaturalMin([1, 2, 3]);
        let sum = 0;
        q.forEach(function(item, entireQueue) {
            sum += item;
            equal(entireQueue, this);
        }, q);
        equal(sum, 6);
    });
    test("iterator", () => {
        const q = PriorityQueue.newNaturalMin([1, 2, 3]);
        let sum = 0;
        for (const item of q) {
            sum += item;
        }
        equal(sum, 6);
    });
});
