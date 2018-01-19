import { loader } from 'pixi.js';
import { Image } from './files';
import { randomInt } from './utils';
import Card from './card';
import CardStatus from './card-status';
import CardList from './card-list';

const { resources } = loader;

export default class Deck extends CardList {
  constructor(initialDeck: CardStatus[]) {
    super();
    this.visible = false;
    this.texture = resources[Image.Deck].texture;
    this.shuffle(initialDeck.map(v => new Card(v)));
  }

  drawCards(num: number): Card[] {
    const cards = [];
    for (let i = 0; i < num; i += 1) {
      cards.push(this.pop());
    }
    return cards;
  }

  setLocalPlayer(isLocalPlayer: boolean) {
    this.visible = isLocalPlayer;
    this.addCardEventListener(() => this.render());
  }

  shuffle(addCards?: Card[]) {
    if (addCards.length > 0) {
      this.cards.push(...addCards);
    }
    const cards: Card[] = [];
    for (let i = 0, length = this.count; i < length; i += 1) {
      const rand = randomInt(0, this.count);
      cards[i] = this.cards[rand];
      this.cardList = this.cards.filter((v, num) => num !== rand);
    }
    this.cardList = cards;
    this.render();
  }

  render() {
    if (this.isEmpty()) {
      this.texture = null;
    } else {
      this.texture = resources[Image.Deck].texture;
      this.y = 400;
      this.width = 100;
      this.height = this.width * this.texture.height / this.texture.width;
    }
  }
}
