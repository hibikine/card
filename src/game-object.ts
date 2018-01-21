import { Container } from 'pixi.js';

export default class GameObject extends Container {
  private isGameObjectDestroy: boolean = false;
  constructor() {
    super();
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
