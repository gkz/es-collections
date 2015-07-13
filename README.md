# es-collections

es-collections is an ES6/ES2015 (JavaScript) collections library including **Stack**, **Queue**, and **PriorityQueue** data structures.

Map and Set were added in ES2015. This library adds other frequently used collections with an interface consistent with those additions.

You can simulate a stack and a queue with a JavaScript array, but using the collections provided here:

- **Provides clarity of intent** to your fellow programmers (eg. when they see `new Queue()` they know exactly what you want to do, while using an array, your intentions are ambiguous - should they add an item to the front, or the back?)
- **Avoids bugs** by disallowing unwanted behaviour (eg. shifting a stack)

For updates on es-collections, [follow me on twitter](https://twitter.com/gkzahariev).

*Skip to API:* [Stack](#stack) | [Queue](#queue) | [PriorityQueue](#priorityqueue)

## Examples
```js
import {Stack, Queue, PriorityQueue} from 'es-collections';
let s = new Stack();
s.push(1);
s.push(2);
s.pop(); //=> 2

let q = new Queue();
s.enqueue(1);
s.enqueue(2);
s.dequeue(); //=> 1

let pq = new PriorityQueue((a, b) => a.val - b.val);
pq.add({val: 3});
pq.add({val: 1});
pq.add({val: 2});
pq.remove(); //=> {val: 1}
pq.remove(); //=> {val: 2}
```

## Installation

```
npm install --save es-collections
```

## Usage
You can either import one or multiple collections from `es-collections`:

```js
import {Stack, Queue, PriorityQueue} from 'es-collections';
```

Or import them individually:

```js
import Stack from 'es-collections/Stack';
import Queue from 'es-collections/Queue';
import PriorityQueue from 'es-collections/PriorityQueue';
```

Since few JavaScript implementations have full support for ES6/ES2015, use a compiler such as [Babel](https://babeljs.io) for your ES6/ES2015 code.

For use in a browser you must use some sort of module bundler, like [webpack](http://webpack.github.io) or [Browserify](http://browserify.org/).

## Collections

An `expression; //=> xxx` comment means that `expression` evaluates to `xxx`.

Optional arguments are surrounded by brackets, eg. `func(required[, optional])`.

---

### Stack

A stack is a last-in first-out data structure.

Import with either:

```js
import {Stack} from 'es-collections';
import Stack from 'es-collections/Stack';
```

Example:

```js
let s = new Stack();
s.push(1);
s.push(2);
s.pop(); //=> 2
```

#### new Stack([iterable])

The constructor has an optional argument, which must be iterable if present. If supplied an iterable, the constructor will push the first item, then the second item, and so on. Thus the first item of the iterable will end up at the bottom of the stack.

```js
let s = new Stack();
```

```js
let s = new Stack([1, 2, 3]);
s.pop() //=> 3
s.pop() //=> 2
s.pop() //=> 1
```

#### Stack.prototype.push(item)

Pushes an item on top of the stack. Returns `this`, so can be chained.

```js
let s = new Stack();
s.push(1);
s.push(2).push(3);
s.pop() //=> 3
s.pop() //=> 2
s.pop() //=> 1
```
#### Stack.prototype.pop()

Pops off the top of the stack. Returns the item popped off. Returns `undefined` when popping an empty stack.

```js
let s = new Stack();
s.push(1);
s.pop() //=> 1
s.pop() //=> undefined
```

#### Stack.prototype.peek()

Returns the top of the stack, but does not remove it. Returns `undefined` when peeking an empty stack.

```js
let s = new Stack();
s.push(1);
s.peek() //=> 1
s.pop() //=> 1
s.peek() //=> undefined
```

#### Stack.prototype.clear()

Clears the stack, deleting all items.

```js
let s = new Stack([1, 2, 3]);
s.size; //=> 3
s.clear();
s.size; //=> 0
```

#### Stack.prototype.has(item)

Checks whether an item is on the stack.

```js
let s = new Stack([1, 2, 3]);
s.has(2); //=> true
s.has(4); //=> false
```

#### Stack.prototype.size

A property that holds the size of the stack. It is a getter, and cannot be set, only read.

```js
let s = new Stack([1, 2, 3]);
s.size; //=> 3
s.push(4);
s.size; //=> 4

while (s.size > 0) {
    s.pop();
}

s.size; //=> 0
```

#### Stack.prototype.forEach(callback[, thisArg])

Calls `callback` on each item in the stack, in the order of how the items would be popped off. First the top of the stack, then second to the top, and so on.

`callback` is supplied with two arguments, the item in question, and the entire stack.

If `thisArg` is supplied, the callback's `this` will be set to `thisArg`.

```js
let s = new Stack();
s.push(1);
s.push(2);
s.push(3);

s.forEach(item => console.log(item));
// prints:
// 3
// 2
// 1

s.forEach((item, stack) => console.log(item, stack.size));
// prints:
// 3 3
// 2 3
// 1 3

s.forEach(item => console.log(item, this.size), s);
// prints:
// 3 3
// 2 3
// 1 3
```

#### Stack.prototype[Symbol.iterator]

Allows for iteration of the stack, in the order of how the items would be popped off. First the top of the stack, then second to the top, and so on.

```js
let s = new Stack();
s.push(1);
s.push(2);
s.push(3);

for (let item of s) {
    console.log(item);
}
// prints:
// 3
// 2
// 1
```

---

### Queue

A queue is a first-in first-out data structure.

Import with either:

```js
import {Queue} from 'es-collections';
import Queue from 'es-collections/Queue';
```

Example:

```js
let q = new Queue();
s.enqueue(1);
s.enqueue(2);
s.dequeue(); //=> 1
```

#### new Queue([iterable])

The constructor has an optional argument, which must be iterable if present. If supplied an iterable, the constructor will enqueue the first item, then the second item, and so on. Thus the first item of the iterable will be the first to be dequeued.

```js
let q = new Queue();
```

```js
let q = new Queue([1, 2, 3]);
q.dequeue() //=> 1
q.dequeue() //=> 2
q.dequeue() //=> 3
```

#### Queue.prototype.enqueue(item)

Enqueues an item to the back of the queue. Returns `this`, so can be chained.

```js
let q = new Queue();
q.enqueue(1);
q.enqueue(2).enqueue(3);
q.dequeue() //=> 3
q.dequeue() //=> 2
q.dequeue() //=> 1
```
#### Queue.prototype.dequeue()

Dequeues an item off the front of the queue. Returns that item. Returns `undefined` when dequeuing an empty queue.

```js
let q = new Queue();
q.enqueue(1);
q.dequeue() //=> 1
q.dequeue() //=> undefined
```

#### Queue.prototype.peek()

Returns the front item of the queue, but does not remove it. Returns `undefined` when peeking an empty queue.

```js
let q = new Queue();
q.enqueue(1);
q.peek() //=> 1
q.dequeue() //=> 1
q.peek() //=> undefined
```

#### Queue.prototype.clear()

Clears the queue, deleting all items.

```js
let q = new Queue([1, 2, 3]);
q.size; //=> 3
q.clear();
q.size; //=> 0
```

#### Queue.prototype.has(item)

Checks whether an item is in the queue.

```js
let q = new Queue([1, 2, 3]);
q.has(2); //=> true
q.has(4); //=> false
```

#### Queue.prototype.size

A property that holds the size of the queue. It is a getter, and cannot be set, only read.

```js
let q = new Queue([1, 2, 3]);
q.size; //=> 3
q.enqueue(4);
q.size; //=> 4

while (s.size > 0) {
    s.dequeue();
}

q.size; //=> 0
```

#### Queue.prototype.forEach(callback[, thisArg])

Calls `callback` on each item in the queue, in the order of how the items would be dequeued off. First the front of the queue, then second from the front, and so on.

`callback` is supplied with two arguments, the item in question, and the entire queue.

If `thisArg` is supplied, the callback's `this` will be set to `thisArg`.

```js
let q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

q.forEach(item => console.log(item));
// prints:
// 1
// 2
// 3

q.forEach((item, queue) => console.log(item, queue.size));
// prints:
// 1 3
// 2 3
// 3 3

q.forEach(item => console.log(item, this.size), s);
// prints:
// 1 3
// 2 3
// 3 3
```

#### Queue.prototype[Symbol.iterator]

Allows for iteration of the queue, in the order of how the items would be dequeued off. First the front of the queue, then second to the from the front, and so on.

```js
let q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

for (let item of q) {
    console.log(item);
}
// prints:
// 1
// 2
// 3
```

---

### PriorityQueue

A priority queue is a data structure like a queue, but instead of removing the oldest item, it removes the item with the highest priority. This priority is defined using a function which compares two different items and returns whether the first is greater-than, less-than, or equal to the second.

Import with either:

```js
import {PriorityQueue} from 'es-collections';
import PriorityQueue from 'es-collections/PriorityQueue';
```

Example:

```js
let pq = new PriorityQueue((a, b) => a.val - b.val);
pq.add({val: 3});
pq.add({val: 1});
pq.add({val: 2});
pq.remove(); //=> {val: 1}
pq.remove(); //=> {val: 2}
```

While the APIs for Stack and Queue are fairly stable, the API for PriorityQueue, particularly the name of the `add` and `remove` methods, and the two static functions, may change.

#### new PriorityQueue(compareFunction[, iterable])

The first argument, `compareFunction`, is a required argument. The function takes two arguments, and returns a negative number if the first one has higher priority, zero if they are equal, and a positive number if the second has higher priority.

For example:

```js
function compareFunction(a, b) {
    return a - b;
}
```

Produces a priority queue which has the minimum number at the highest priority.

The second is an optional argument, which must be iterable if present. If supplied an iterable, the constructor will add the first item, then the add item, and so on.

```js
let pq = new PriorityQueue((a, b) => a - b);
```

```js
let pq = new PriorityQueue((a, b) => a - b, [3, 1, 2]);
pq.remove() //=> 1
pq.remove() //=> 2
pq.remove() //=> 3
```

#### PriorityQueue.newNaturalMin([iterable])

A static function that creates a priority queue with a `compareFunction` based on the `<` and `>` operators - thus it works with numbers, strings, and other items that can be naturally compared. This allows you to avoid having to supply a `compareFunction` for this common use case. In this case, the smallest item is at the top. Supplying an iterable works just as supplying an iterable to the constructor.

```js
let pq = PriorityQueue.newNaturalMin();
pq.add(3);
pq.add(1);
pq.add(2);
pq.remove() //=> 1
pq.remove() //=> 2
pq.remove() //=> 3
```

#### PriorityQueue.newNaturalMax([iterable])

A static function that creates a priority queue with a `compareFunction` based on the `<` and `>` operators - thus it works with numbers, strings, and other items that can be naturally compared. This allows you to avoid having to supply a `compareFunction` for this common use case. In this case, the largest item is at the top. Supplying an iterable works just as supplying an iterable to the constructor.

```js
let pq = PriorityQueue.newNaturalMax();
pq.add(3);
pq.add(1);
pq.add(2);
pq.remove() //=> 3
pq.remove() //=> 2
pq.remove() //=> 1
```

#### PriorityQueue.prototype.add(item)

Adds an item to the priority queue. Returns `this`, so can be chained.

```js
let pq = new PriorityQueue((a, b) => a - b);
pq.add(1);
pq.add(2).add(3);
pq.remove() //=> 3
pq.remove() //=> 2
pq.remove() //=> 1
```
#### PriorityQueue.prototype.remove()

Removes the item with the highest priority. Returns that item. Returns `undefined` when removing from an empty priority queue.

```js
let pq = new PriorityQueue((a, b) => a - b);
pq.add(1);
pq.remove() //=> 1
pq.remove() //=> undefined
```

#### PriorityQueue.prototype.peek()

Returns the top priority item of the priority queue, but does not remove it. Returns `undefined` when peeking an empty priority queue.

```js
let pq = new PriorityQueue((a, b) => a - b);
pq.add(1);
pq.peek() //=> 1
pq.remove() //=> 1
pq.peek() //=> undefined
```

#### PriorityQueue.prototype.delete(item)

Deletes an item from anywhere in the priority queue. The first item in the queue which matches the supplied item, using the `compareFunction` supplied upon construction, is deleted. Return whether an items has been found and deleted `true`, or not `false`.

```js
let pq = new PriorityQueue((a, b) => a - b, [1, 2, 3]);
pq.size; //=> 3
pq.delete(2);
pq.size; //=> 2
```

#### PriorityQueue.prototype.clear()

Clears the priority queue, deleting all items.

```js
let pq = new PriorityQueue((a, b) => a - b, [1, 2, 3]);
pq.size; //=> 3
pq.clear();
pq.size; //=> 0
```

#### PriorityQueue.prototype.has(item)

Checks whether an item is in the priority queue. Uses the `compareFunction` supplied upon construction to check for equality.

```js
let pq = new PriorityQueue((a, b) => a - b, [1, 2, 3]);
pq.has(2); //=> true
pq.has(4); //=> false
```

#### PriorityQueue.prototype.size

A property that holds the size of the priority queue. It is a getter, and cannot be set, only read.

```js
let pq = new PriorityQueue((a, b) => a - b, [1, 2, 3]);
pq.size; //=> 3
pq.add(4);
pq.size; //=> 4

while (s.size > 0) {
    s.remove();
}

pq.size; //=> 0
```

#### PriorityQueue.prototype.forEach(callback[, thisArg])

Calls `callback` on each item in the priority queue. The order is arbitrary.

`callback` is supplied with two arguments, the item in question, and the entire priority queue.

If `thisArg` is supplied, the callback's `this` will be set to `thisArg`.

```js
let pq = new PriorityQueue((a, b) => a -b);
pq.add(1);
pq.add(2);
pq.add(3);

pq.forEach(item => console.log(item));
// each item printed in arbitrary order

pq.forEach((item, queue) => console.log(item, queue.size));
// each item printed in arbitrary order, along with the queue's size: 3

pq.forEach(item => console.log(item, this.size), s);
// each item printed in arbitrary order, along with the queue's size: 3
```

#### PriorityQueue.prototype[Symbol.iterator]

Allows for iteration of the priority queue. The order is arbitrary.

```js
let pq = new PriorityQueue((a, b) => a -b);
pq.add(1);
pq.add(2);
pq.add(3);

for (let item of pq) {
    console.log(item);
}
// each item printed in arbitrary order
```

## Philosophy

The collections included in this package should not include every possible feature. Instead, the aim is to answer the question: if a Stack/Queue/PriorityQueue was part of the standard library, what would it look like?

## License

MIT
