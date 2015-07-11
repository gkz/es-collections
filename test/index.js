import {strictEqual as equal} from "assert";
import {Stack, Queue, PriorityQueue} from "../src";

suite("index", () => {
    test("everything is available", () => {
        const s = new Stack();
        const q = new Queue();
        const pq = new PriorityQueue((a, b) => a - b);
        s.push(1);
        q.enqueue(1);
        pq.add(1);
        equal(s.pop(), 1);
        equal(q.dequeue(), 1);
        equal(pq.remove(), 1);
    });
});
