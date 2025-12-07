export type UseGenerator = ReturnType<typeof createUseGenerator>;

export type UseValue = <T>(init: () => T) => { value: T };

export function createUseGenerator<State>(
	useState: <U>(init: () => U) => State,
	getState: <U>(state: State) => U,
	setState: <U>(state: State, value: (prev: U) => U) => void,
) {
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
		const state = useState<StateValue>(init);

		return {
			get value(): IteratorResult<T, TReturn> {
				return getState<StateValue>(state).current;
			},
			next: (...args: [nextValue: TNext] | []): void => {
				const next = getState<StateValue>(state).generator.next(...args);
				setState<StateValue>(state, (prev) => ({
					generator: prev.generator,
					current: next,
				}));
			},
			return: (returnValue: TReturn): void => {
				const ret = getState<StateValue>(state).generator.return(returnValue);
				setState<StateValue>(state, (prev) => ({
					generator: prev.generator,
					current: ret,
				}));
			},
			throw: (error: unknown): void => {
				const thrown = getState<StateValue>(state).generator.throw(error);
				setState<StateValue>(state, (prev) => ({
					generator: prev.generator,
					current: thrown,
				}));
			},
			reset: (): void => {
				setState<StateValue>(state, init);
			},
		};
	};
}
