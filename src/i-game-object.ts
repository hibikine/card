export default interface IGameObject {
  dispose(): void;
  isDestroy(): boolean;
  update(delta: number): void;
};
