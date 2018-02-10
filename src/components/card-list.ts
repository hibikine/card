import GameObject from '../game-object';
import Card from '../card';
import Container = PIXI.Container;
import IGameComponent from '../game-component';

export type CardEventListener = (cardList: CardList) => void;

export default class CardList implements IGameComponent {
  protected cardList: Card[] = [];
  private eventListener: CardEventListener[] = [];
  public gameObject?: GameObject;
  public dispose(): void {}

  public get name() {
    return 'CardList';
  }
  public update(delta: number): void {}
  public clone(): IGameComponent {
    return new CardList();
  }
  public setGameObject(gameObject: GameObject): GameObject {
    this.gameObject = gameObject;
    this.cardList.map(c => gameObject.addChild(c.gameObject));
    return gameObject;
  }

  constructor(cards: Card[] = []) {
    if (cards.length === 1) {
      this.push(cards[0]);
    } else if (cards.length > 1) {
      this.push(cards[0], ...cards.slice(1, cards.length));
    }
  }

  protected sendEvent() {
    this.eventListener.map(e => e(this));
  }

  public addCardEventListener(callback: CardEventListener) {
    this.eventListener.push(callback);
  }

  public deleteCardEventListener(callback: CardEventListener) {
    this.eventListener = this.eventListener.filter(e => e !== callback);
  }

  public get cards() {
    return this.cardList;
  }

  public get count() {
    return this.cards.length;
  }

  public push(card: Card, ...cards: Card[]) {
    this.cardList.push(card, ...cards);
    this.addChildCard(card, ...cards);
    this.sendEvent();
    return card;
  }

  protected addChildCard(card: Card, ...cards: Card[]) {
    if (this.gameObject != null) {
      this.gameObject.addChild(
        card.gameObject,
        ...cards.map(c => c.gameObject)
      );
    }
  }

  public push_back(card: Card, ...cards: Card[]) {
    this.addChildCard(card, ...cards);
    this.cardList = cards.concat(this.cardList);
    this.sendEvent();
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  pop(): Card {
    const card = this.cardList.pop();
    this.gameObject.removeChild(card.gameObject);
    this.sendEvent();
    return card;
  }

  clear(): Card[] {
    const cards = this.cardList;
    cards.map(card => this.gameObject.removeChild(card.gameObject));
    this.cardList = [];
    this.sendEvent();
    return cards;
  }

  remove(...cards: Card[]) {
    this.cardList = this.cards.filter(v => cards.indexOf(v) !== -1);
    cards.map(v => this.gameObject.removeChild(v));
    this.sendEvent();
    return cards;
  }
}
