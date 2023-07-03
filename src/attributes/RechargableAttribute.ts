import { Attribute } from './Attribute';
import { ITimeAware } from '../ITimeAware';

export class RechargableAttribute extends Attribute implements ITimeAware {
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
    this.lastUpdated = 0; // Using an abstract time that starts from 0
  }

  update(timeElapsed: number): void {
    this.value = Math.min(
      this.max,
      this.value + this.rechargeRate * timeElapsed
    );
  }

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
