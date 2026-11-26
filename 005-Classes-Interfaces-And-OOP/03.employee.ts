// Create an Employee that extends Person with a salary.
import { Person } from './02.person.js';

export class Employee extends Person {
  constructor(
    firstName: string,
    lastName: string,
    public salary: number,
  ) {
    super(firstName, lastName);
  }
}
