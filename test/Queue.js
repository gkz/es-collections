import {strictEqual as equal} from "assert";
import Queue from "../Queue";

suite("Queue", () => {
    test("new with iterator", () => {
        const q = new Queue([1, 2, 3]);
        equal(q.size, 3);
        equal(q.dequeue(), 1);
        equal(q.dequeue(), 2);
        equal(q.dequeue(), 3);
        equal(q.size, 0);
    });
    test("enqueue, dequeue", () => {
        const q = new Queue();
        q.enqueue(1);
        equal(q.size, 1);
        equal(q.dequeue(), 1);
        equal(q.size, 0);
    });
    test("chained enqueue", () => {
        const q = new Queue();
        q.enqueue(1).enqueue(2).enqueue(3);
        equal(q.size, 3);
        equal(q.dequeue(), 1);
        equal(q.size, 2);
    });
    test("dequeue empty", () => {
        const q = new Queue();
        equal(q.size, 0);
        equal(q.dequeue(), undefined);
    });
    test("peek", () => {
        const q = new Queue();
        q.enqueue(1);
        equal(q.size, 1);
        equal(q.peek(), 1);
        equal(q.size, 1);
    });
    test("peek empty", () => {
        const q = new Queue();
        equal(q.size, 0);
        equal(q.peek(), undefined);
    });
    test("clear", () => {
        const q = new Queue([1, 2, 3]);
        equal(q.size, 3);
        q.clear();
        equal(q.size, 0);
    });
    test("forEach", () => {
        const q = new Queue([1, 2, 3]);
        let i = 1;
        q.forEach(function(item, entireQueue) {
            equal(item, i);
            equal(entireQueue, q);
            i++;
        });
    });
    test("forEach with thisArg", () => {
        const q = new Queue([1, 2, 3]);
        let i = 1;
        q.forEach(function(item, entireQueue) {
            equal(item, i);
            equal(entireQueue, this);
            i++;
        }, q);
    });
    test("iterator", () => {
        const q = new Queue([1, 2, 3]);
        let i = 1;
        for (const item of q) {
            equal(item, i);
            i++;
        }
    });
});
