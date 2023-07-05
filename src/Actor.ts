import { ComponentProps, Entity } from 'super-ecs';
import { AttributesComponent } from './components/AttributesComponent';
import { AttributeEffect } from './components/AttributeEffect';

export class Actor extends Entity {
  constructor(attributes: ComponentProps<AttributesComponent>) {
    super();
    this.addComponent(new AttributesComponent(attributes));
  }

  addEffect(effect: AttributeEffect): void {
    const attributesComponent = this.getComponent<AttributesComponent>(
      AttributesComponent.TYPE
    );

    if (attributesComponent) {
      attributesComponent.effects.push(effect);
    }
  }
}
