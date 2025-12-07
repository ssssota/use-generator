import { ref } from "vue";
import type { UseGenerator } from "./create-use-generator.js";
import { createUseGenerator } from "./index.js";

export const useGenerator: UseGenerator = createUseGenerator(refValue);

function refValue<T>(init: () => T) {
	const r = ref<T>(init());
	return {
		get value() {
			return r.value;
		},
		set value(v: T) {
			r.value = v;
		},
	};
}
