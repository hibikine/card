import {loader} from 'pixi.js';
import {Image} from './files';
import {randomInt} from './utils';
import GameObject from './game-object';
const {resources} = loader;

import Card from './card';
export default class Deck extends GameObject {
  private cards: Card[] = [];
  constructor() {
    super(resources[Image.Deck].texture);
  }
  shuffle(addCards?: Card[]) {
    if (addCards !== undefined) {
      this.cards.push(...addCards);
    }
    const cards = new Array<Card>(this.cards.length);
    for(let i = 0, length = this.cards.length; i < length; i += 1) {
      const rand = randomInt(0, this.cards.length);
      cards[i] = this.cards[rand];
      this.cards = this.cards.filter((v, num) => num === rand);
    }
    this.cards = cards;
    this.renderDeck();
  }
  renderDeck() {
    if (this.cards.length === 0) {
      this.texture = null;
    } else {
      this.texture = resources[Image.Deck].texture;
    }
  }
  pop() {
    const card = this.cards.pop();
    this.renderDeck();
    return card;
  }
  push(...cards: Card[]) {
    this.cards.push(...cards);
    this.renderDeck();
  }
}
