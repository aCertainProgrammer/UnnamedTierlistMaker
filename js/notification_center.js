export default class NotificationCenter {
	constructor() {
		this.subscribers = {};
	}

	subscribe(event, callback) {
		if (!this.subscribers[event]) {
			this.subscribers[event] = [];
		}

		this.subscribers[event].push(callback);
	}

	unsubscribe(event, callback) {
		if (this.subscribers[event] == null) return;

		this.subscribers[event] = this.subscribers[event].filter(
			(subscriber) => subscriber !== callback,
		);
	}

	publish(event, data) {
		if (this.subscribers[event] == null) return;

		this.subscribers[event].forEach((callback) => callback(data));
	}
}
