// Define an interface for this data:
//   { name: 'John Smith', salary: 50_000, address: { street: 'Flinders st', city: 'Melbourne', zipCode: 3144 } }
export interface Address {
  street: string;
  city: string;
  zipCode: number;
}

export interface Employee {
  name: string;
  salary: number;
  address: Address;
}

export const employee: Employee = {
  name: 'John Smith',
  salary: 50_000,
  address: { street: 'Flinders st', city: 'Melbourne', zipCode: 3144 },
};
