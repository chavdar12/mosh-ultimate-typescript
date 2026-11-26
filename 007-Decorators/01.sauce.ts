// Create a decorator that adds a sauce to Pizza instances:  @Sauce('pesto') class Pizza {}
export function Sauce(sauce: string) {
  return (constructor: Function) => {
    constructor.prototype.sauce = sauce;
  };
}

@Sauce('pesto')
export class Pizza {
  declare sauce: string;
}
