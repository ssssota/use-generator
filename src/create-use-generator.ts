export type UseGenerator = ReturnType<typeof createUseGenerator>;

export type UseValue = <T>(init: () => T) => { value: T };

export function createUseGenerator(useValue: UseValue) {
	// biome-ignore lint/suspicious/noExplicitAny: use for generic types
	return function useGenerator<T = unknown, TReturn = any, TNext = any>(
		fn: () => Generator<T, TReturn, TNext>,
	) {
		type StateValue = {
			generator: Generator<T, TReturn, TNext>;
			current: IteratorResult<T, TReturn>;
		};
		const init = (): StateValue => {
			const generator = fn();
			const first = generator.next();
			return { generator, current: first };
		};
		const state = useValue(init);

		return {
			get value(): IteratorResult<T, TReturn> {
				return state.value.current;
			},
			next: (...args: [nextValue: TNext] | []): void => {
				const next = state.value.generator.next(...args);
				state.value = { generator: state.value.generator, current: next };
			},
			return: (returnValue: TReturn): void => {
				const ret = state.value.generator.return(returnValue);
				state.value = { generator: state.value.generator, current: ret };
			},
			throw: (error: unknown): void => {
				const thrown = state.value.generator.throw(error);
				state.value = { generator: state.value.generator, current: thrown };
			},
			reset: (): void => {
				state.value = init();
			},
		};
	};
}
