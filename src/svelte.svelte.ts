/// <reference types="svelte" />

import type { UseGenerator } from "./create-use-generator.js";
import { createUseGenerator } from "./index.js";

export const useGenerator: UseGenerator = createUseGenerator(refValue);

function refValue<T>(init: () => T) {
	let state = $state.raw(init());
	return {
		get value() {
			return state;
		},
		set value(newValue) {
			state = newValue;
		},
	};
}
