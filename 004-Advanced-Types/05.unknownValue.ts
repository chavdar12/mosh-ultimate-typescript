// What is wrong with this, and how do you fix it?
//   let value: unknown = 'a';
//   console.log(value.toUpperCase());
// `unknown` allows no operations until it is narrowed, so `toUpperCase` is a compile error.
// Fix: narrow with a type guard (better than casting with `as string`).
export function upper(value: unknown): string | undefined {
  if (typeof value === 'string') return value.toUpperCase();
  return undefined;
}

const value: unknown = 'a';
// @ts-expect-error the original code: methods can't be called on `unknown`
export const broken = () => value.toUpperCase();
