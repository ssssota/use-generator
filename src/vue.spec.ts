import { expect, it } from "vitest";
import { useGenerator } from "./vue.js";

it("useGenerator hook works correctly", () => {
	function* gen() {
		yield 0;
		yield 1;
		yield 2;
		return "DONE";
	}
	const g = useGenerator(gen);

	expect(g.value).toStrictEqual({ done: false, value: 0 });

	g.next();
	expect(g.value).toStrictEqual({ done: false, value: 1 });

	g.next();
	expect(g.value).toStrictEqual({ done: false, value: 2 });

	g.next();
	expect(g.value).toStrictEqual({ done: true, value: "DONE" });
});

it("useGenerator return", () => {
	function* gen() {
		yield 0;
		yield 1;
		yield 2;
		return "DONE";
	}
	const g = useGenerator(gen);

	expect(g.value).toStrictEqual({ done: false, value: 0 });

	g.return("STOP");
	expect(g.value).toStrictEqual({ done: true, value: "STOP" });
});

it("useGenerator throw", () => {
	function* gen() {
		try {
			yield 0;
			yield 1;
			yield 2;
		} catch (e) {
			yield e;
		}
		return "DONE";
	}
	const g = useGenerator(gen);

	expect(g.value).toStrictEqual({ done: false, value: 0 });

	g.next();
	expect(g.value).toStrictEqual({ done: false, value: 1 });

	g.throw("ERROR");
	expect(g.value).toStrictEqual({ done: false, value: "ERROR" });

	g.next();
	expect(g.value).toStrictEqual({ done: true, value: "DONE" });
});

it("useGenerator reset", () => {
	function* gen() {
		yield 0;
		yield 1;
		yield 2;
		return "DONE";
	}
	const g = useGenerator(gen);

	expect(g.value).toStrictEqual({ done: false, value: 0 });

	g.next();
	expect(g.value).toStrictEqual({ done: false, value: 1 });

	g.reset();
	expect(g.value).toStrictEqual({ done: false, value: 0 });
});
