import { createSignal } from "solid-js";
import type { UseGenerator } from "./create-use-generator.js";
import { createUseGenerator } from "./index.js";

export const useGenerator: UseGenerator = createUseGenerator(createRefValue);

function createRefValue<T>(init: () => T) {
	const [get, set] = createSignal<T>(init());
	return {
		get value() {
			return get();
		},
		set value(v: T) {
			set(() => v);
		},
	};
}
