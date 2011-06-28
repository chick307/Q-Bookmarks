
function Preference(args){
	console.assert(this instanceof Preference);

	if(args == null)
		args = {};

	Object.defineProperties(this, {
		prefix: {
			enumerable: true,
			value: String(args.prefix || '')
		},
		suffix: {
			enumerable: true,
			value: String(args.suffix || '')
		},
		storage: {
			enumerable: true,
			value: args.storage || localStorage
		},
		cache_: {
			value: {}
		},
		listeners_: {
			value: []
		}
	});
}

Object.defineProperties(Preference.prototype, {
	get: {
		value: function(key, defaultValue){
			var key_ = this.prefix + key + this.suffix;
			if(key_ in this.cache_)
				return this.cache_[key_];
			var value_ = this.storage[key_];
			if(typeof value_ !== 'undefined')
				return JSON.parse(value_);
			return defaultValue;
		}
	},
	set: {
		value: function(key, value){
			var key_ = this.prefix + key + this.suffix;
			this.storage[key_] = JSON.stringify(this.cache_[key_] = value);
			this.dispatchEvent(key, value);
			return value;
		}
	},
	setDefault: {
		value: function(key, value){
			var result = this.get(key);
			if(typeof result === 'undefined')
				result = this.set(key, value);
			return result;
		}
	},
	addListener: {
		value: function(listener){
			this.listeners_.push(listener);
		}
	},
	removeListener: {
		value: function(listener){
			var i = this.listeners_.indexOf(listener);
			if(i !== -1)
				delete this.listeners_[i];
		}
	},
	hasListener: {
		value: function(listener){
			return this.listeners_.indexOf(listener) !== -1;
		}
	},
	dispatchEvent: {
		value: function(key, value){
			this.listeners_.forEach(function(listener){
				listener.call(this, key, value);
			}, this);
		}
	}
});

