import { RechargableAttribute } from '../src/index';

describe('RechargableAttribute class', () => {
  let attribute: RechargableAttribute;

  beforeEach(() => {
    attribute = new RechargableAttribute('energy', 50, 0, 100, 0.01);
  });

  it('should initialize with correct value', () => {
    expect(attribute.getValue()).toEqual(50);
  });

  it('should update its value after 1000 units of time', () => {
    attribute.update(1000);
    expect(attribute.getValue()).toEqual(60);
  });

  it('should reach maximum value after 5000 units of time', () => {
    attribute.update(5000);
    expect(attribute.getValue()).toEqual(100);
  });

  it('should maintain maximum value after exceeding time', () => {
    attribute.update(6000);
    expect(attribute.getValue()).toEqual(100);
  });

  it('should initialize with correct value', () => {
    expect(attribute.getValue()).toEqual(50);
  });

  it('should set attribute value correctly', () => {
    attribute.setValue(75);
    expect(attribute.getValue()).toEqual(75);
  });

  it('should throw an error when trying to set invalid value', () => {
    expect(() => attribute.setValue(105)).toThrowError(/Invalid value/);
  });
});