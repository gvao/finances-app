export type Props = Record<string, unknown>

export default class EventEmitter {
	called: Record<string, number> = {};
	events: Record<string, Array<(args?: Props ) => void>> = {};

	on(eventName: string, listener: (args?: Props) => void) {
		if (typeof listener !== "function") throw new Error();
		if (!this.events[eventName]) this.events[eventName] = [];
		this.events[eventName].push(listener);
	}

    off(eventName: string, listener: () => void): void {
        const index = this.events[eventName].findIndex(listener)
        this.events[eventName].splice(index, 1);
    }

	incrementCalled = (eventname: string) =>
		!this.called[eventname]
			? (this.called[eventname] = 1)
			: this.called[eventname]++;

	emit(eventName: string, args?: Props) {
		if (!this.events[eventName]) return;
		this.events[eventName].forEach((listener) => {
			listener(args);
			this.incrementCalled(eventName);
		});
	}
}