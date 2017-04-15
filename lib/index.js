let _ = {};

class State {
	constructor(value) {
		Object.defineProperty(this, 'value', {
			value: value,
			writable: false
		})
	}

	then(func) {
		return new State(func(this.value));
	}

	apply(func, args) {
		return new State(func(this.value, ...args));
	}

	applyM(method, args) {
		return new State(method.apply(this.value, args));
	}

	call(func, ...args) {
		return new State(func(this.value, ...args));
	}

	callM(method, ...args) {
		return new State(method.call(this.value, ...args));
	}

	bulk(funcs) {
		return new State(funcs.reduce((value, transform) => {
			return transform(value);
		}, this.value));
	}

	get() {
		return this.value;
	}
}

function select(value) {
	return new State(value);
}


module.exports = {
	select,
	State
}