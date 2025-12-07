import { useRef, useState } from "preact/hooks";
import type { UseGenerator } from "./create-use-generator.js";
import { createUseGenerator } from "./create-use-generator.js";
import { createUseValue } from "./create-use-value.js";

const useValue = createUseValue({ useRef, useState });
export const useGenerator: UseGenerator = createUseGenerator(useValue);
