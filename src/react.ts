import { useState } from "react";
import type { UseGenerator } from "./create-use-generator.js";
import { createUseGenerator } from "./create-use-generator.js";

export const useGenerator: UseGenerator = createUseGenerator(
	// biome-ignore lint/suspicious/noExplicitAny: Workaround for higher kinded types
	useState<any>,
	([state]) => state,
	([, set], fn) => set(fn),
);
