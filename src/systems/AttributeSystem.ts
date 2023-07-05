import { System, TickerDataLike } from 'super-ecs';
import { AttributesComponent } from '../components/AttributesComponent';

export class AttributesSystem extends System {
  update(tickerData: TickerDataLike): void {
    const entities = this.world.getEntities([AttributesComponent.TYPE]);

    entities.forEach(entity => {
      const attributesComponent = entity.getComponent<AttributesComponent>(
        AttributesComponent.TYPE
      );

      if (attributesComponent) {
        attributesComponent.effects.forEach(effect => {
          effect.duration -= 1;

          if (effect.duration <= 0) {
            // Remove expired effect
            const index = attributesComponent.effects.indexOf(effect);
            attributesComponent.effects.splice(index, 1);
          } else {
            // Apply effect
            attributesComponent[effect.attribute] += effect.modifier;
          }
        });
      }
    });
  }
}
