// Define a Logger that takes a file name in its constructor and has a method for writing messages to that file.
import { appendFileSync } from 'node:fs';

export class Logger {
  constructor(public readonly fileName: string) {}

  write(message: string): void {
    appendFileSync(this.fileName, `${message}\n`);
  }
}
