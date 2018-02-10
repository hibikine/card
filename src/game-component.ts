import IGameObject from './i-game-object';
export default interface IGameComponent {
  update: (delta: number) => void;
  name: string;
  clone(): IGameComponent;
  setGameObject(gameObject: IGameObject): IGameObject;
  dispose: () => void;
};
