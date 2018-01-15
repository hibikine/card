import CardStatus from './card-status';
import GameObject from './game-object';
import GamePhase from './game-phase';

export default class Supply extends GameObject {
  private cardStatus: CardStatus;
  private _size: number;
  private gamePhase: GamePhase = GamePhase.Summon;
  init(cardStatus: CardStatus, size: number = 10) {
    this.cardStatus = cardStatus;
    this._size = size;
    this.setAvailability(true);
    return this;
  }
  get size() {
    return this._size;
  }
  setSize(size: number): void {
    this._size = size;
  }
  setGamePhase(gamePhase: GamePhase) {
    this.gamePhase = gamePhase;
    switch (gamePhase) {
      case GamePhase.Buy:
        this.setAvailability(false);
        break;

      default:
        this.setAvailability(true);
    }
  }
  setCost(cost: number) {
    if (cost >= this.cardStatus.cost) {
      this.setAvailability(true);
    } else {
      this.setAvailability(false);
    }
  }
  setAvailability(isAvailable: boolean) {
    if (isAvailable) {
      this.tint = 0xaaaaaa;
    }
  }
  isEmpty(): boolean {
    return this._size === 0;
  }
}
