import { describe, expect, test } from "vitest";
import EventEmitter, { Props } from '.'

const makeSut = () => {
	const sut = new EventEmitter();
	const anyFunction = () => {};
	sut.on("any_name", anyFunction);
	return { sut, anyFunction };
};

describe("EventEmitter", () => {
	test("should create a new EventEmitter", () => {
		const { sut } = makeSut();

		expect(sut).instanceOf(EventEmitter);
	});

	test("should ensure event is object", () => {
		const { sut } = makeSut();

		expect(typeof sut.events).toEqual("object");
	});

	test("should add 3 listeners in event", () => {
		const { sut, anyFunction } = makeSut();
		const eventName = "any_name";

		expect(sut.events[eventName].length).toEqual(1);

		sut.on(eventName, anyFunction);
		sut.on(eventName, anyFunction);

		expect(sut.events[eventName].length).toEqual(3);
	});

	test("should return true when call emit", () => {
		const { sut } = makeSut();
		let result01 = false;
		let result02 = false;

		const listener01 = () => (result01 = true);
		const listener02 = () => (result02 = true);

		sut.on("any_event", listener01);
		sut.on("any_event", listener02);
		sut.emit("any_event");

		expect(result01).toEqual(true);
		expect(result02).toEqual(true);
	});

	test("should return true when called emit and not events", () => {
		const { sut, anyFunction } = makeSut();
		sut.emit("any_event");

		expect(sut.called["any_event"]).toBeFalsy();

		sut.on("any_event", anyFunction);
		sut.on("any_event", anyFunction);
		sut.emit("any_event");

		expect(sut.called["any_event"]).toBe(2);
	});

	test("should remove one event listener", () => {
		const { sut, anyFunction } = makeSut();
        const eventName = "any_event" 
        
		sut.on(eventName, anyFunction);
		sut.on(eventName, anyFunction);
		sut.off(eventName, anyFunction);

        expect(sut.events[eventName].length).toBe(1)
	});

	test('should receive args from emit to listeners', () => {
		const { sut } = makeSut()

		const eventName = 'any_event'

		const anyFunction = function (args?: Props) {
			expect(typeof args).toBe('object')
			expect(args!.name).toBe('any_name')
		}

		sut.on(eventName, anyFunction)

		sut.emit(eventName, { name: 'any_name' })
	})
});
