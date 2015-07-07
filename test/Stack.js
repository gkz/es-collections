import {strictEqual as equal} from "assert";
import Stack from "../Stack";

suite("Stack", () => {
    test("new with iterator", () => {
        const s = new Stack([1, 2, 3]);
        equal(s.size, 3);
        equal(s.pop(), 3);
        equal(s.pop(), 2);
        equal(s.pop(), 1);
        equal(s.size, 0);
    });
    test("push, pop", () => {
        const s = new Stack();
        s.push(1);
        equal(s.size, 1);
        equal(s.pop(), 1);
        equal(s.size, 0);
    });
    test("pop empty", () => {
        const s = new Stack();
        equal(s.size, 0);
        equal(s.pop(), undefined);
    });
    test("peek", () => {
        const s = new Stack();
        s.push(1);
        equal(s.size, 1);
        equal(s.peek(), 1);
        equal(s.size, 1);
    });
    test("peek empty", () => {
        const s = new Stack();
        equal(s.size, 0);
        equal(s.peek(), undefined);
    });
    test("clear", () => {
        const s = new Stack([1, 2, 3]);
        equal(s.size, 3);
        s.clear();
        equal(s.size, 0);
    });
    test("forEach", () => {
        const s = new Stack([1, 2, 3]);
        let i = 3;
        s.forEach(function(item, entireStack) {
            equal(item, i);
            equal(entireStack, s);
            i--;
        });
    });
    test("forEach with thisArg", () => {
        const s = new Stack([1, 2, 3]);
        let i = 3;
        s.forEach(function(item, entireStack) {
            equal(item, i);
            equal(entireStack, this);
            i--;
        }, s);
    });
    test("iterator", () => {
        const s = new Stack([1, 2, 3]);
        let i = 3;
        for (const item of s) {
            equal(item, i);
            i--;
        }
    });
});
