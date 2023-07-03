import { StaticAttribute, AttributeStore, RechargableAttribute } from '../src/index';

describe('AttributeStore class', () => {
  let character: AttributeStore;

  beforeEach(() => {
    character = new AttributeStore();
    character.addAttribute('attributes.strength', new StaticAttribute('strength', 10, 0, 20));
    character.addAttribute('attributes.energy', new RechargableAttribute('energy', 50, 0, 100, 0.01));
    character.addAttribute('skills.hacking.energy', new RechargableAttribute('energy', 30, 0, 100, 0.02));
  });

  it('should correctly get attribute values', () => {
    const attributeValue = character.getAttribute('attributes.strength');
    expect(attributeValue).toEqual(10);
  });

  it('should correctly set attribute values', () => {
    character.setAttribute('attributes.strength', 15);
    const attributeValue = character.getAttribute('attributes.strength');
    expect(attributeValue).toEqual(15);
  });

  it('should throw an error when getting nonexistent attribute', () => {
    expect(() => character.getAttribute('nonexistent')).toThrowError(/Invalid attribute path/);
  });

  it('should throw an error when setting nonexistent attribute', () => {
    expect(() => character.setAttribute('nonexistent', 10)).toThrowError(/Invalid attribute path/);
  });

  it('should correctly update the RechargableAttributes in the character attribute tree', () => {
    character.update(1000);
    expect(character.getAttribute('attributes.energy')).toEqual(60); // Increase due to recharge
    expect(character.getAttribute('attributes.strength')).toEqual(10); // No change
    expect(character.getAttribute('skills.hacking.energy')).toEqual(50); // Increase due to recharge
  });

  it('should correctly update nested RechargableAttributes in the character attribute tree', () => {
    character.update(3000);
    expect(character.getAttribute('attributes.energy')).toEqual(80); // Increase due to recharge
    expect(character.getAttribute('attributes.strength')).toEqual(10); // No change
    expect(character.getAttribute('skills.hacking.energy')).toEqual(90); // Increase due to recharge
  });

  it('should correctly handle nested AttributeStore instances', () => {
    const nestedAttribute = new AttributeStore();
    nestedAttribute.addAttribute('strength', new StaticAttribute('strength', 10, 0, 20));
    character.addAttribute('attributes.physical', nestedAttribute);

    expect(character.getAttribute('attributes.physical.strength')).toEqual(10); // Verify nested attribute retrieval
    character.setAttribute('attributes.physical.strength', 15); // Verify nested attribute setting
    expect(character.getAttribute('attributes.physical.strength')).toEqual(15);
    expect(() => character.getAttribute('attributes.physical.nonexistent')).toThrowError(/Invalid attribute path/); // Test error for invalid nested attribute
    expect(() => character.setAttribute('attributes.physical.nonexistent', 10)).toThrowError(/Invalid attribute path/); // Test error for setting invalid nested attribute
});

it('should correctly update nested AttributeStore instances', () => {
    const nestedAttribute = new AttributeStore();
    nestedAttribute.addAttribute('energy', new RechargableAttribute('energy', 50, 0, 100, 0.01));
    character.addAttribute('attributes.stamina', nestedAttribute);

    character.update(1000);

    expect(character.getAttribute('attributes.stamina.energy')).toEqual(60); // Increase due to recharge
});

});
