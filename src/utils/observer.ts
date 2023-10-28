export const makeObserver = () => {
	const listeners: (() => void)[] = [];

	return {
		emit: () => listeners.forEach((listener) => listener()),

		subscribe: (listener: () => void) => listeners.push(listener),
	};
};
