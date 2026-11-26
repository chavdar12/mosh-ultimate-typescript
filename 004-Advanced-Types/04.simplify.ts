// Simplify:
//   console.log(user && user.address ? user.address.street : undefined);
//   let x = foo !== null && foo !== undefined ? foo : bar();
export type Address = { street: string };
export type Customer = { address?: Address | null } | null | undefined;

/** Optional chaining replaces the `&&` guard. */
export function streetOf(user: Customer): string | undefined {
  return user?.address?.street;
}

/** Nullish coalescing replaces the null/undefined check; `bar` only runs when needed. */
export function valueOr<T>(foo: T | null | undefined, bar: () => T): T {
  return foo ?? bar();
}
