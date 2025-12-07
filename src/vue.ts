import { ref } from "vue";
import type { UseGenerator } from "./create-use-generator.js";
import { createUseGenerator } from "./index.js";

export const useGenerator: UseGenerator = createUseGenerator(
	// biome-ignore lint/suspicious/noExplicitAny: Workaround for higher kinded types
	(init) => ref<any>(init()),
	(ref) => ref.value,
	(ref, fn) => {
		ref.value = fn(ref.value);
	},
);
