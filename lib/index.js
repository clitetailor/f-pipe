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




class Version extends State {
	constructor(value) {
		super(value);
		
		this.run = this.then;
		this.play = this.then;
	}

	then(func) {
		let newVersion = new Version(func(this.value));

		Object.defineProperty(newVersion, '_previous', {
			value: this.value
		});

		Object.defineProperty(newVersion, '_change', {
			value: () => func
		});
		return newVersion;
	}

	apply(func, args) {
		let newVersion = new Version(func(this.value, ...args))

		Object.defineProperty(newVersion, '_previous', {
			value: this.value
		});

		Object.defineProperty(newVersion, '_change', {
			value: () => value => func(value, ...args)
		});
		return newVersion;
	}

	applyM(method, args) {
		let newVersion = new Version(method.apply(this.value, args))
		
		Object.defineProperty(newVersion, '_previous', {
			value: this.value
		});

		Object.defineProperty(newVersion, '_change', {
			value: () => value => method.apply(value, args)
		});
		return newVersion;
	}

	call(func, ...args) {
		let newVersion = new Version(func(this.value, ...args))

		Object.defineProperty(newVersion, '_previous', {
			value: this.value
		});

		Object.defineProperty(newVersion, '_change', {
			value: () => value => func(value, ...args)
		});
		return newVersion;
	}

	callM(method, ...args) {
		let newVersion = new Version(method.call(this.value, ...args))

		Object.defineProperty(newVersion, '_previous', {
			value: this.value
		});

		Object.defineProperty(newVersion, '_change', {
			value: () => value => method.call(value, ...args)
		});
		return newVersion;
	}

	bulk(funcs) {
		Object.defineProperty(newVersion, '_previous', {
			value: this.value
		});

		Object.defineProperty(newVersion, '_change', {
			value: () => value => funcs.reduce((_value, transform) => {
				return transform(_value);
			}, value)
		});

		return new Version(funcs.reduce((value, transform) => {
			return transform(value);
		}, this.value));
	}

	sequence(funcs) {
		let version = this;
		for (let func in funcs) {
			version = version.run(func);
		}
		return version;
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
		return this.value;
	}
}

function track(value) {
	return new Version(value);
}




class StateTracker {
	constructor(value) {
		this.value = value;
	}

	then(func) {
		this.value = func(value);
		return this;
	}
}

function lock(value) {
	return new StateTracker(value);
}




class VersionTracker extends StateTracker {

}

function lockAndTrack(value) {
	return new VersionTracker(value);
}



module.exports = {
	select,
	State,
	track,
	Version,
	lock,
	StateTracker,
	lockAndTrack,
	VersionTracker
}