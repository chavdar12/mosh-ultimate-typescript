// What is the difference between private and protected members?
// Both are hidden from code outside the class. Protected members are also usable in subclasses;
// private members are not. (Both are compile-time only: the JS output still has the properties.)
export class Account {
  private pin = 1234;
  protected balance = 100;

  checkPin(pin: number): boolean {
    return pin === this.pin;
  }
}

export class SavingsAccount extends Account {
  addInterest(): number {
    this.balance *= 1.05; // protected: allowed in a subclass
    // @ts-expect-error private: not even subclasses can use it
    void this.pin;
    return this.balance;
  }
}
