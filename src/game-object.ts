import {Sprite, Texture} from "pixi.js";

export default class GameObject extends Sprite {
  private _isDestroy: boolean = false;
  constructor(texture?: Texture) {
    super(texture);
  }
  dispose() {

  }
  destroy() {
    this._isDestroy = true;
  }
  get isDestroy(): boolean {
    return this._isDestroy;
  }
  update(delta: number) {
  }
}
