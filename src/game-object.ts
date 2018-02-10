import { Container } from 'pixi.js';
import IGameComponent from './game-component';

export default class GameObject extends Container {
  private components: IGameComponent[];
  private isGameObjectDestroy: boolean = false;
  constructor() {
    super();
  }
  dispose() {}
  destroy() {
    this.isGameObjectDestroy = true;
  }
  isDestroy(): boolean {
    return this.isGameObjectDestroy;
  }

  /**
   * Calls this every frame.
   * @param {number} delta
   */
  update(delta: number): void {
    for (let i = 0; i < this.components.length; i += 1) {
      this.components[i].update(delta);
    }
  }

  /**
   * Add GameComponent instance to this GameObject.
   * @param {IGameComponent} c
   * @returns {IGameComponent}
   */
  addComponent(c: IGameComponent): IGameComponent {
    this.components.push(c);
    return c;
  }

  /**
   * Delete attached GameComponent instance to this GameObject.
   * @param {IGameComponent} c
   */
  removeComponent(c: IGameComponent): void {
    this.components = this.components.filter(v => {
      if (v === c) {
        v.dispose();
        return false;
      }
      return true;
    });
  }

  /**
   * Search a GameComponent whose type is c and return its instance attached first.
   * @param {{new(...args: any[]): T}} c
   * @returns {T | null}
   */
  getComponent<T extends IGameComponent>(
    c: new (...args: any[]) => T
  ): T | null {
    for (let i = 0; i < this.components.length; i += 1) {
      if (this.components[i] instanceof c) {
        return this.components[i] as T;
      }
    }
    return null;
  }

  /**
   * Return all of GameComponent whose type is c.
   * @param {{new(...args: any[]): T}} c
   * @returns {GameComponent[]}
   */
  getComponents<T extends IGameComponent>(c: new (...args: any[]) => T): T[] {
    return this.components.filter(v => v.name === name) as T[];
  }

  clone(): IGameObject {
    const cloneObject = new GameObject();
    this.components.map(c => {
      const component: IGameComponent = c.clone();
      component.setGameObject(cloneObject);
      cloneObject.addComponent(component);
    });
    return cloneObject;
  }
}
