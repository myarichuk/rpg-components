import fs from 'fs';
import yaml from 'js-yaml';
import { AttributeStoreFactory } from '../src/AttributeStoreFactory';
import { StaticAttribute, RechargableAttribute } from '../src';

jest.mock('fs', () => {
  const actualFs = jest.requireActual('fs');
  return {
    ...actualFs,
    readdirSync: jest.fn(),
    readFileSync: jest.fn(),
    statSync: jest.fn(),
  };
});

jest.mock('js-yaml', () => {
  const actualYaml = jest.requireActual('js-yaml');
  return {
    ...actualYaml,
    load: jest.fn(),
  };
});

describe('AttributeStoreFactory', () => {
  let factory: AttributeStoreFactory;

  const warriorProfile = {
    'attributes.strength': { name: 'strength', value: 20, min: 0, max: 100 },
    'attributes.vitality': { name: 'vitality', value: 20, min: 0, max: 100 },
  };

  const mageProfile = {
    'attributes.intelligence': {
      name: 'intelligence',
      value: 30,
      min: 0,
      max: 100,
    },
    'attributes.vitality': { name: 'vitality', value: 10, min: 0, max: 100 },
  };

  beforeEach(() => {
    (fs.readdirSync as jest.Mock).mockReturnValue([
      'Warrior.yaml',
      'Mage.yaml',
    ]);
    (fs.readFileSync as jest.Mock).mockImplementation(filePath => {
      if (filePath.includes('Warrior.yaml')) {
        return 'Warrior yaml content';
      } else if (filePath.includes('Mage.yaml')) {
        return 'Mage yaml content';
      }
    });
    (fs.statSync as jest.Mock).mockImplementation(filePath => {
      return {
        isFile: () =>
          filePath.includes('Warrior.yaml') || filePath.includes('Mage.yaml'),
      };
    });

    (yaml.load as jest.Mock).mockImplementation(yamlString => {
      if (yamlString === 'Warrior yaml content') {
        return warriorProfile;
      } else if (yamlString === 'Mage yaml content') {
        return mageProfile;
      }
    });

    factory = new AttributeStoreFactory('/profiles');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an AttributeStore based on the warrior profile', () => {
    const warriorAttributes = factory.createAttributeStore('Warrior');

    expect(warriorAttributes.getAttribute('attributes.strength')).toEqual(20);
    expect(warriorAttributes.getAttribute('attributes.vitality')).toEqual(20);
  });

  it('should create an AttributeStore based on the mage profile', () => {
    const mageAttributes = factory.createAttributeStore('Mage');

    expect(mageAttributes.getAttribute('attributes.intelligence')).toEqual(30);
    expect(mageAttributes.getAttribute('attributes.vitality')).toEqual(10);
  });

  it('should throw an error if the profile does not exist', () => {
    expect(() => factory.createAttributeStore('NonexistentProfile')).toThrow(
      'Profile NonexistentProfile does not exist'
    );
  });
});
