// An entity has a unique id whose type (number, string, GUID...) depends on the use case. Use a generic class.
export class Entity<TId> {
  constructor(public readonly id: TId) {}
}
