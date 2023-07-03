export abstract class Attribute {
  constructor(
    public name: string,
    protected value: number,
    public min: number,
    public max: number
  ) {}

  abstract getValue(): number;
  abstract setValue(value: number): void;
}
