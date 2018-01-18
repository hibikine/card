import GameObject from './game-object';
import Card from './card';

export default class Hands extends GameObject {
  private holdings: Card[];
  add(...cards: Card[]) {
    this.holdings.push(...cards);
  }

  get cards() {
    return this.holdings;
  }

  use(card: Card, cost: number = 0) {
    this.holdings = this.holdings.filter(v => v === card);
    card.use(cost);
    return card;
  }

  remove(...cards: Card[]) {
    this.holdings = this.holdings.filter(v => cards.indexOf(v) !== -1);
    return cards;
  }

  setVisible(isVisible: boolean): void {
    // TODO:
  }
}
