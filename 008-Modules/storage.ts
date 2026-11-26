// Lesson: a default export next to named exports.
export enum Format {
  Raw,
  Compressed,
}

export default class Store {
  private readonly items: string[] = [];

  save(item: string, format = Format.Raw): string {
    const stored = format === Format.Compressed ? item.replace(/\s+/g, '') : item;
    this.items.push(stored);
    return stored;
  }

  get count(): number {
    return this.items.length;
  }
}
