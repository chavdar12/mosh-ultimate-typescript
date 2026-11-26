// Convert to a generic function:  function echo(arg) { return arg; }
export function echo<T>(arg: T): T {
  return arg;
}
