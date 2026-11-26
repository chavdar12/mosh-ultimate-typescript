// Why doesn't this compile, and how do you fix it?
//   function printName<T>(obj: T) { console.log(obj.name); }
// T could be any type, so TypeScript can't know it has `name`. Constrain T to types that do.
export function printName<T extends { name: string }>(obj: T): void {
  console.log(obj.name);
}
