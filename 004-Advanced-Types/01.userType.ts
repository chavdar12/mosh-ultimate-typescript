// Give these objects a type annotation.
export type User = {
  name: string;
  age: number;
  occupation: string;
};

export const user: User = { name: 'John Smith', age: 30, occupation: 'Software engineer' };

export const users: User[] = [user, { name: 'Kate Müller', age: 28, occupation: 'Astronaut' }];
