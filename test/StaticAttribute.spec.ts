import { StaticAttribute } from "../src/index";

describe('StaticAttribute class', () => {
    let attribute: StaticAttribute;
  
    beforeEach(() => {
      attribute = new StaticAttribute('strength', 10, 0, 20);
    });
  
    it('should initialize with correct value', () => {
      expect(attribute.getValue()).toEqual(10);
    });
  
    it('should set attribute value correctly', () => {
      attribute.setValue(15);
      expect(attribute.getValue()).toEqual(15);
    });
  
    it('should throw an error when trying to set invalid value', () => {
      expect(() => attribute.setValue(25)).toThrowError(/Invalid value/);
    });
  });
  