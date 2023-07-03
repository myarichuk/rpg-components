import { StaticAttribute, RechargableAttribute } from '../src/index';

describe('Attribute classes', () => {
  it('should correctly get and set StaticAttribute values', () => {
    const attribute = new StaticAttribute('strength', 10, 0, 20);
    expect(attribute.getValue()).toEqual(10);
    attribute.setValue(15);
    expect(attribute.getValue()).toEqual(15);
    expect(() => attribute.setValue(25)).toThrowError(/Invalid value/);
  });

  it('should correctly get and set RechargableAttribute values', async () => {
    const attribute = new RechargableAttribute('energy', 50, 0, 100, 0.01);
    expect(attribute.getValue()).toEqual(50);
    attribute.setValue(75);
    expect(attribute.getValue()).toEqual(75);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second.
    expect(attribute.getValue()).toBeGreaterThanOrEqual(75); // Value should have increased.
    expect(() => attribute.setValue(105)).toThrowError(/Invalid value/);
  });
});
