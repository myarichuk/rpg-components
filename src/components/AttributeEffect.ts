import { AttributesComponent } from './AttributesComponent';

export class AttributeEffect {
  attribute: keyof AttributesComponent;
  modifier: number;
  duration: number; // Duration in game turns

  constructor(
    attribute: keyof AttributesComponent,
    modifier: number,
    duration: number
  ) {
    this.attribute = attribute;
    this.modifier = modifier;
    this.duration = duration;
  }
}
