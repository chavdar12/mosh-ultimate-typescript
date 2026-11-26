// Given this interface, what does KeysOfProduct represent?
export interface Product {
  name: string;
  price: number;
}

// A union of the interface's property names: 'name' | 'price'.
export type KeysOfProduct = keyof Product;

/** keyof in use: reads any property with the right type. */
export function prop<K extends KeysOfProduct>(product: Product, key: K): Product[K] {
  return product[key];
}
