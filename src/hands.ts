import GameObject from './game-object';
import Card from './card';

export default class Hands extends GameObject {
  private _cards: Card[];
  add(...cards: Card[]) {
    this._cards.push(...cards);
  }

  get cards() {
    return this._cards;
  }

  use(card: Card, cost: number = 0) {
    this._cards = this._cards.filter(v => v === card);
    card.use(cost);
    return card;
  }

  remove(...cards: Card[]) {
    this._cards = this._cards.filter(v => cards.indexOf(v) !== -1);
    return cards;
  }

  setVisible(isVisible: boolean): void {
    // TODO:
  }
}
