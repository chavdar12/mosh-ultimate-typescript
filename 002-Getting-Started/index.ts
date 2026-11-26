// Lesson: your first TypeScript program. Run with `npm run build && node dist/index.js`.
export function greeting(): string {
  const age: number = 20;
  // age = 'a'; // a compile error: TypeScript stops the bug before it runs
  return `Hello World, I'm ${age}`;
}

if (import.meta.url === `file://${process.argv[1]}`) console.log(greeting());
