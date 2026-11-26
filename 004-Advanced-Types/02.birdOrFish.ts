// Create Bird (can fly) and Fish (can swim) types, and a Pet that is one or the other.
export type Bird = { fly(): string };
export type Fish = { swim(): string };
export type Pet = Bird | Fish;

/** Narrows the union with an `in` check. */
export function move(pet: Pet): string {
  return 'fly' in pet ? pet.fly() : pet.swim();
}
