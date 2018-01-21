import GameObject from './game-object';
import Card from './card';
import Container = PIXI.Container;

export type CardEventListener = (cardList: CardList) => void;

export default class CardList extends GameObject {
  protected cardList: Card[] = [];
  private eventListener: CardEventListener[] = [];

  constructor(cards: Card[] = []) {
    super();
    if (cards.length === 1) {
      this.push(cards[0]);
    } else if (cards.length > 1) {
      this.push(cards[0], ...cards.slice(1, cards.length));
    }
  }

  protected sendEvent() {
    this.eventListener.map(e => e(this));
  }

  addCardEventListener(callback: CardEventListener) {
    this.eventListener.push(callback);
  }

  deleteCardEventListener(callback: CardEventListener) {
    this.eventListener = this.eventListener.filter(e => e !== callback);
  }

  get cards() {
    return this.cardList;
  }

  get count() {
    return this.cards.length;
  }

  push(card: Card, ...cards: Card[]) {
    this.cardList.push(card, ...cards);
    this.addChildCard(card, ...cards);
    this.sendEvent();
    return card;
  }

  addChildCard(card: Card, ...cards: Card[]) {
    this.addChild(card, ...cards);
  }

  push_back(card: Card, ...cards: Card[]) {
    this.addChildCard(card, ...cards);
    this.cardList = cards.concat(this.cardList);
    this.sendEvent();
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  pop(): Card {
    const card = this.cardList.pop();
    this.removeChild(card);
    this.sendEvent();
    return card;
  }

  clear(): Card[] {
    const cards = this.cardList;
    this.cardList = [];
    this.sendEvent();
    return cards;
  }

  remove(...cards: Card[]) {
    this.cardList = this.cards.filter(v => cards.indexOf(v) !== -1);
    cards.map(v => this.removeChild(v));
    this.sendEvent();
    return cards;
  }
}
