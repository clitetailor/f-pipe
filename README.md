F-PIPE
======
> A pipe system for Javascript

Motivation
----------

Sometimes in Javascript, you will do something like this:

```javascript
let stateTree = { branch1: "apple", branch2: "pine", branch3: "coconut" }

stateTree = addMoreLight(stateTree);
stateTree = water(stateTree);
stateTree = treeShaking(stateTree);
stateTree = swing(stateTree);
stateTree = /*...*/
```

But what if:

```javascript
const stateTree = { branch1: "apple", branch2: "pine", branch3: "coconut" }
```

Maybe you just want to:

```javascript
cutDownTheTree(stateTree);
```

Solution:

```javascript
const youngTree = { branch1: "apple", branch2: "pine", branch3: "coconut" }

const bigTree = select(youngTree)
		.then(tree => singASong(tree))
		.then(tree => lala(tree))
		.then(/* i will do everything until it becomes a big tree */)
		.get();
```

Install
-------

```bash
npm install --save f-pipe
```

API Reference
-------------

### .then

```javascript
const youngTree = { branch1: "apple", branch2: "pine", branch3: "coconut" }

const bigTree = select(youngTree)
		.then(tree => singASong(tree))
		.then(tree => lala(tree))
		.then(/* i will do everything until it becomes a big tree */)
		.get();
```

### .apply

```javascript
const a = 5;

const b = select(a).apply(add, 2)
	.apply(multipy, 4)
	.get();

console.log(b);
// => 14
```

### .call

```javascript
const one = ["one"];

const numbers = select(one)
	.call(concat, ["two", "three", "four"])
	.get();

console.log(numbers);
// => ["one", "two", "three", "four"]
```

### .applyM

```javascript
const message = new Message("P/s: Today i'll be home late!");

const content = select(message).applyM(Message.prototype.read)
	.get();

console.log(content);
// => 'P/s: Today i\'ll be home late!'
```

### .callM

```javascript
const clock = new Clock();

const alarm = select(clock)
	.callM(Clock.prototype.alarm, "8:30", "You're late for school!")
	.get();

console.log(alarm);
// => '8:30 AM : You are late for school!'
```