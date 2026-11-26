export class Square {
  constructor(public width: number) {}

  get area(): number {
    return this.width ** 2;
  }
}
