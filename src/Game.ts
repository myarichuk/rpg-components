import { TickerDataLike, World } from 'super-ecs';

export class Game {
  private world: World;
  private turnTimeDelta = {
    deltaTime: 1.0, //hypothetical time unit
    elapsedMS: 0,
    lastTime: 0,
  } as TickerDataLike;

  constructor() {
    this.world = new World();
  }

  advanceTime(delta: TickerDataLike): void {
    this.world.update(delta);
  }

  advanceTurn(): void {
    this.world.update(this.turnTimeDelta);
  }
}
