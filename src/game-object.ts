import { Sprite, Texture } from 'pixi.js';

export default class GameObject extends Sprite {
  private isGameObjectDestroy: boolean = false;
  constructor(texture?: Texture) {
    super(texture);
  }
  dispose() {

  }
  destroy() {
    this.isGameObjectDestroy = true;
  }
  get isDestroy(): boolean {
    return this.isGameObjectDestroy;
  }
  update(delta: number) {
  }
}
