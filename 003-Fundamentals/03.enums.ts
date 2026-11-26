// Represent t-shirt sizes with an enum.
export enum Size {
  Small = 1,
  Medium,
  Large,
}

export function label(size: Size): string {
  return size === Size.Small ? 'S' : size === Size.Medium ? 'M' : 'L';
}
