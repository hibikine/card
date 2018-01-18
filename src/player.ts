import GameObject from './game-object';
import Hands from './hands';
import Deck from './deck';
import { loader, Text } from 'pixi.js';
import { Image } from './files';
import Trash from './trash';
import CardList from './card-list';
import CardStatus from './card-status';
import Rules from './rules';
import Container = PIXI.Container;

const { resources } = loader;

export default class Player extends GameObject {
  private hands: Hands;
  private deck: Deck;
  private handNumber: Text;
  private trash: Trash;
  private isLocalPlayer: boolean = false;

  constructor(initialDeck: CardStatus[], root: Container) {
    super(resources[Image.CardBack].texture);
    this.deck = new Deck(initialDeck);
    this.hands = new Hands(this.deck.drawCards(Rules.InitialDrawCards));
    this.trash = new Trash();
    this.handNumber = new Text(
      this.hands.count.toString(),
      { fontSize: 200, fill: 0xffffff });

    this.addChild(
      this.handNumber,
    );

    root.addChild(
      this.hands,
      this.deck,
      this.trash,
    );

    this.hands.addCardEventListener(hands => this.setCardNumber(hands));
  }

  setCardNumber(hands: CardList) {
    this.handNumber.text = hands.count.toString();
  }

  setLocalPlayer(isLocalPlayer: boolean = true) {
    this.isLocalPlayer = isLocalPlayer;
    this.hands.setLocalPlayer(isLocalPlayer);
    this.trash.setLocalPlayer(isLocalPlayer);
    this.deck.setLocalPlayer(isLocalPlayer);
  }

  draw(num: number = 1) {
    for (let i = 0; i < num; i += 1) {
      this.hands.push(this.deck.pop());
    }
  }

  /**
   * 捨て札をひっくり返して山札にする
   */
  reShuffle() {
    const trashCards = this.trash.clear();
    this.deck.shuffle(trashCards);
  }
}
