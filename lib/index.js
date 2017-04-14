let _ = {};

class State {
	constructor(state) {
		this.state = state;
	}

	then(callback) {
		return new State(callback(this.state));
	}

	apply(callback, args) {
		return new State(callback(this.state, args));
	}

	applyM(callback, args) {
		return new State(callback.apply(this.state, args));
	}

	call(callback, ...args) {
		return new State(callback(this.state, ...args));
	}

	callM(callback, ...args) {
		return new State(callback.call(this.state, ...args));
	}

	get() {
		return this.state;
	}
}

function select(state) {
	return new State(state);
}

class Version extends State {
	constructor(state) {
		super(state);

		this.run = this.then;
		this.play = this.then;
	}

	then(callback) {
		let newVersion = new Version(callback(this.state));
		Object.defineProperty(newVersion, '_previous', {
			value: this.state
		});
		Object.defineProperty(newVersion, '_change', {
			value: () => callback(this.state)
		});
		return newVersion;
	}

	apply(func, args) {
		let newVersion = new Version(callback(this.state, args))
		Object.defineProperty(newVersion, '_previous', {
			value: this.state
		});
		Object.defineProperty(newVersion, '_change', {
			value: () => callback(this.state, args)
		});
		return newVersion;
	}

	applyM(method, args) {
		let newVersion = new Version(callback(this.state, args))
		Object.defineProperty(newVersion, '_previous', {
			value: this.state
		});
		Object.defineProperty(newVersion, '_change', {
			value: () => callback(this.state, args)
		});
		return newVersion;
	}

	call(func, ...args) {
		let newVersion = new Version(callback(this.state, ...args))
		Object.defineProperty(newVersion, '_previous', {
			value: this.state
		});
		Object.defineProperty(newVersion, '_change', {
			value: () => callback(this.state, ...args)
		});
		return newVersion;
	}

	callM(method, ...args) {
		let newVersion = new Version(callback.call(this.state, ...args))
		Object.defineProperty(newVersion, '_previous', {
			value: this.state
		});
		Object.defineProperty(newVersion, '_change', {
			value: () => callback.call(this.state, ...args)
		});
		return newVersion;
	}

	backTo(version) {
		let versions = [this];

		let cur = this._previous;
		while (!!cur || cur !== version) {
			versions.unshift(cur);
			cur = cur._previous;
		}

		return versions;
	}

	take(count) {
		let versions = [];

		let cur = this;
		while (versions.length < count && !!cur) {
			versions.unshift(cur);
			cur._previous;
		}

		return versions;
	}

	previous() {
		return this._previous;
	}

	change() {
		return this._change();
	}

	replay(versions) {
		return versions.reduce((current, next) =>
			current.run(next.change()), this);
	}

	get() {
		return this.state;
	}
}

function track(state) {
	return new Version(state);
}

module.exports = {
	select,
	State,
	track,
	Version
}