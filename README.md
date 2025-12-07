# use-generator

Hooks for using generator functions in React/Preact/SolidJS/Vue/Svelte.

Generator functions are a powerful way to manage state and side effects in a declarative way.

```ts
import { useGenerator } from '@ssssota/use-generator/react';
function *counter(): Generator<number, never, number> {
  let i = 0;
  while (true) {
    i += yield i;
  }
}
function useCounter() {
  const gen = useGenerator(counter);
  return {
    count: gen.value.value,
    increment: (step = 1) => gen.next(step),
    reset: () => gen.reset(),
  }
}
```

```ts
import { useGenerator } from '@ssssota/use-generator/svelte';
function* survey(): Generator<string, readonly [string, string], string> {
  const name = yield 'What is your name?';
  const age = yield `Hello ${name}, how old are you?`;
  return [name, age] as const;
}
function useSurvey() {
  const gen = useGenerator(survey);
  if (gen.value.done) return gen.value.value;
  return {
    question: gen.value.value,
    answer: (response: string) => gen.next(response),
    reset: () => gen.reset(),
  };
}
```

## Installation

```sh
npm install @ssssota/use-generator
```

## API

```ts
type GeneratorFunction<T = any, TReturn = any, TNext = unknown> = () => Generator<T, TReturn, TNext>;
const useGenerator: <T = unknown, TReturn = any, TNext = any>(fn: GeneratorFunction<T, TReturn, TNext>) => {
  readonly value: IteratorResult<T, TReturn>;
  next: (...args: [nextValue: TNext] | []) => void;
  return: (returnValue: TReturn) => void;
  throw: (error: any) => void;
  reset: () => void;
};
```

## LICENSE

MIT
