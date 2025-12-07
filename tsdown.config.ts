import { defineConfig } from "tsdown";

export default defineConfig({
	entry: [
		"src/index.ts",
		"src/solid.ts",
		"src/react.ts",
		"src/preact.ts",
		"src/vue.ts",
		"src/svelte.svelte.ts",
	],
	tsconfig: "tsconfig.lib.json",
	dts: { build: true },
});
