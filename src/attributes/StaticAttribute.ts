import { Attribute } from './Attribute';

export class StaticAttribute extends Attribute {
  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    if (value < this.min || value > this.max) {
      throw new Error(
        `Invalid value: ${value}. It should be in range [${this.min}, ${this.max}]`
      );
    }
    this.value = value;
  }
}
