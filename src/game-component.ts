import GameObject from './game-object';
export default interface IGameComponent {
  update: (delta: number) => void;
  name: string;
  gameObject?: GameObject;
  clone(): IGameComponent;
  setGameObject(gameObject: GameObject): GameObject;
  dispose: () => void;
};
