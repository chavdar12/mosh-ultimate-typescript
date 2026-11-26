// Type an employee: a read-only id, a name, and a retire method that takes a date.
export const employee: {
  readonly id: number;
  name: string;
  retire: (date: Date) => string;
} = {
  id: 1,
  name: 'Mosh',
  retire: (date: Date) => `Retires on ${date.toISOString().slice(0, 10)}`,
};
