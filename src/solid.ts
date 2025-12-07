import { createSignal } from "solid-js";
import type { UseGenerator } from "./create-use-generator.js";
import { createUseGenerator } from "./index.js";

export const useGenerator: UseGenerator = createUseGenerator(
	// biome-ignore lint/suspicious/noExplicitAny: Workaround for higher kinded types
	(init) => createSignal<any>(init()),
	([state]) => state(),
	([, set], fn) => set(fn),
);
