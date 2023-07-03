import { Attribute } from './Attribute';

export class RechargableAttribute extends Attribute {
  rechargeRate: number;
  lastUpdated: number;

  constructor(
    name: string,
    value: number,
    min: number,
    max: number,
    rechargeRate: number
  ) {
    super(name, value, min, max);
    this.rechargeRate = rechargeRate;
    this.lastUpdated = Date.now();
  }

  getValue(): number {
    const timeElapsed = Date.now() - this.lastUpdated;
    this.value = Math.min(
      this.max,
      this.value + this.rechargeRate * timeElapsed
    );
    this.lastUpdated = Date.now();
    return this.value;
  }

  setValue(value: number): void {
    if (value < this.min || value > this.max) {
      throw new Error(
        `Invalid value: ${value}. It should be in range [${this.min}, ${this.max}]`
      );
    }
    this.value = value;
    this.lastUpdated = Date.now();
  }
}
