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
const { select } = require('f-pipe');

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
const result = select(1).apply(sum, [2, 3, 4]).get();

console.log(result);
// => 10
```

### .applyM

```javascript
const cat = "a cat"

const describe = select(cat)
	.applyM(String.prototype.concat, [
		" is sitting on the window"])
	.get();

console.log(describe);
// => a cat is siting on the window
```

### .call

```javascript
const a = 5;

const b = select(a).call(add, 2)
	.call(multipy, 4)
	.get();

console.log(b);
// => 14
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

### .bulk

```javascript
const youngTree = { branch1: "apple", branch2: "pine", branch3: "coconut" }

const bigTree = select(youngTree)
	.bulk([
		addMoreLight,
		water,
		fertilize,
		/*...*/
	]);
```

Changelog
---------

Visit [Github Release](https://github.com/clitetailor/f-pipe) page for more information.