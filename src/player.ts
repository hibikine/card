import GameObject from './game-object';
import Hands from './hands';
import Deck from './deck';

export default class Player extends GameObject {
  private hands: Hands;
  private deck: Deck;
  init() {
    this.hands = new Hands();
    this.deck = new Deck();
  }
}
