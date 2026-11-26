export class Circle {
  constructor(public radius: number) {}

  get area(): number {
    return Math.PI * this.radius ** 2;
  }
}
