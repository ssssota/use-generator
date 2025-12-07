import { act, renderHook } from "@testing-library/preact";
import { expect, it } from "vitest";
import { useGenerator } from "./preact.js";

it("useGenerator hook works correctly", () => {
	function* gen() {
		yield 0;
		yield 1;
		yield 2;
		return "DONE";
	}
	const ctx = renderHook((fn) => useGenerator(fn), {
		initialProps: gen,
	});

	expect(ctx.result.current.value).toStrictEqual({ done: false, value: 0 });

	act(() => ctx.result.current.next());
	expect(ctx.result.current.value).toStrictEqual({ done: false, value: 1 });

	act(() => ctx.result.current.next());
	expect(ctx.result.current.value).toStrictEqual({ done: false, value: 2 });

	act(() => ctx.result.current.next());
	expect(ctx.result.current.value).toStrictEqual({ done: true, value: "DONE" });
});

it("useGenerator return", () => {
	function* gen() {
		yield 0;
		yield 1;
		yield 2;
		return "DONE";
	}
	const ctx = renderHook((fn) => useGenerator(fn), {
		initialProps: gen,
	});

	expect(ctx.result.current.value).toStrictEqual({ done: false, value: 0 });

	act(() => ctx.result.current.return("STOP"));
	expect(ctx.result.current.value).toStrictEqual({ done: true, value: "STOP" });
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
	const ctx = renderHook((fn) => useGenerator(fn), {
		initialProps: gen,
	});

	expect(ctx.result.current.value).toStrictEqual({ done: false, value: 0 });

	act(() => ctx.result.current.next());
	expect(ctx.result.current.value).toStrictEqual({ done: false, value: 1 });

	act(() => ctx.result.current.throw("ERROR"));
	expect(ctx.result.current.value).toStrictEqual({
		done: false,
		value: "ERROR",
	});

	act(() => ctx.result.current.next());
	expect(ctx.result.current.value).toStrictEqual({ done: true, value: "DONE" });
});

it("useGenerator reset", () => {
	function* gen() {
		yield 0;
		yield 1;
		yield 2;
		return "DONE";
	}
	const ctx = renderHook((fn) => useGenerator(fn), {
		initialProps: gen,
	});

	expect(ctx.result.current.value).toStrictEqual({ done: false, value: 0 });

	act(() => ctx.result.current.next());
	expect(ctx.result.current.value).toStrictEqual({ done: false, value: 1 });

	act(() => ctx.result.current.reset());
	expect(ctx.result.current.value).toStrictEqual({ done: false, value: 0 });
});
