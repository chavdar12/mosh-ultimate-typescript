// Type an array of numbers and a user tuple of [id, name].
export const numbers: number[] = [1, 2, 3];

export type User = [number, string];
export const user: User = [1, 'Mosh'];

export function describe([id, name]: User): string {
  return `${id}: ${name}`;
}
