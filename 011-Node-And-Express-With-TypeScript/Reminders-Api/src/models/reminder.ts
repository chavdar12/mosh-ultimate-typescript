export default class Reminder {
  id: number;
  isComplete = false;

  constructor(public title: string) {
    this.id = Date.now() + Math.random();
  }
}
