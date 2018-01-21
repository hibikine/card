import CardStatus from './card-status';
import GameObject from './game-object';
import GamePhase from './game-phase';
import { Text } from 'pixi.js';
import Card from './card';
import Texture = PIXI.Texture;

export default class Supply extends GameObject {
  public card: Card;
  private cost: number = 0;
  private cardStatus: CardStatus;
  private supplySize: number;
  private gamePhase: GamePhase = GamePhase.Summon;
  private numberText: Text;

  init(cardStatus: CardStatus, size: number = 10) {
    this.card = new Card(cardStatus);
    this.addChild(this.card);
    this.cardStatus = cardStatus;
    this.supplySize = size;
    this.setAvailability(true);

    const numberTextFontSize = 100;
    this.numberText = new Text(this.size.toString(), { fontSize: numberTextFontSize });
    this.numberText.anchor.set(1, 1);
    this.numberText.x = this.card.width;
    this.numberText.y = this.card.height;
    this.card.addChild(this.numberText);
    this.render();

    return this;
  }

  get size() {
    return this.supplySize;
  }

  setSize(size: number): number {
    this.supplySize = size;
    this.render();
    return size;
  }

  setGamePhase(gamePhase: GamePhase) {
    this.gamePhase = gamePhase;
    this.render();
  }

  setCost(cost: number) {
    this.cost = cost;
    this.render();
  }

  setAvailability(isAvailable: boolean) {
    if (isAvailable) {
      this.card.tint = 0xffffff;
    } else {
      this.card.tint = 0xaaaaaa;
    }
  }

  get texture(): Texture {
    return this.card.texture;
  }

  isEmpty(): boolean {
    return this.supplySize === 0;
  }

  render() {
    this.numberText.text = this.size.toString();
    if (this.cost < this.cardStatus.cost && this.gamePhase === GamePhase.Buy) {
      this.setAvailability(false);
    } else {
      this.setAvailability(true);
    }
  }
}
