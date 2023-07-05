import { Component, ComponentProps } from 'super-ecs';
import { AttributeEffect } from './AttributeEffect';

export class AttributesComponent implements Component {
  public static TYPE = Symbol('AttributesComponent');
  public name: symbol = AttributesComponent.TYPE;

  public strength: number;
  public dexterity: number;
  public constitution: number;
  public intelligence: number;
  public wisdom: number;
  public charisma: number;
  public effects: AttributeEffect[];

  constructor(props: ComponentProps<AttributesComponent>) {
    const {
      strength = 10,
      dexterity = 10,
      constitution = 10,
      intelligence = 10,
      wisdom = 10,
      charisma = 10,
      effects = [],
    } = props || {};

    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
    this.effects = effects;
  }
}
