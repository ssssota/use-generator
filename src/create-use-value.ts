import type { UseValue } from "./create-use-generator";

export function createUseValue(hooks: {
	useRef: <T>(initialValue: T) => { current: T };
	useState: <T>(init: () => T) => [T, (newValue: T) => void];
}): UseValue {
	const useValue = <T>(init: () => T): { value: T } => {
		const [state, setState] = hooks.useState(init);
		const stateRef = hooks.useRef(state);
		stateRef.current = state;

		const apiRef = hooks.useRef<{ value: T } | undefined>(undefined);
		if (!apiRef.current) {
			apiRef.current = {
				get value() {
					return stateRef.current;
				},
				set value(newValue) {
					setState(newValue);
				},
			};
		}
		return apiRef.current;
	};
	return useValue;
}
