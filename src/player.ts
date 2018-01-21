import GameObject from './game-object';
import Hands from './hands';
import Deck from './deck';
import { loader, Text } from 'pixi.js';
import { Image } from './files';
import Trash from './trash';
import CardList from './card-list';
import CardStatus from './card-status';
import Rules from './rules';
import GamePhase from './game-phase';
import Container = PIXI.Container;

const { resources } = loader;

export default class Player extends GameObject {
  private hands: Hands;
  private deck: Deck;
  private handNumber: Text;
  private trash: Trash;
  private isLocalPlayer: boolean = false;
  private summonableCount: number = 0;
  private energy: number = 0;
  private buyableCount: number = 0;
  private phase: GamePhase = GamePhase.EndOfTurn;
  private phaseWait: number = 0;
  private readonly phaseStrategy: Map<GamePhase, () => GamePhase> = new Map([
    [GamePhase.Summon, this.summonPhase.bind(this)],
    [GamePhase.Buy, this.buyPhase.bind(this)],
    [GamePhase.CleanUp, this.cleanUpPhase.bind(this)],
    [GamePhase.EndOfTurn, this.initTurn.bind(this)],
  ]);

  constructor(initialDeck: CardStatus[]) {
    super(resources[Image.CardBack].texture);
    this.deck = new Deck(initialDeck);
    const cards = this.deck.drawCards(Rules.InitialDrawCards);
    this.hands = new Hands(cards);
    this.trash = new Trash();
    this.handNumber = new Text(
      this.hands.count.toString(),
      { fontSize: 200, fill: 0xffffff });

    this.addChild(
      this.handNumber,
      this.hands,
      this.deck,
      this.trash,
    );

    this.hands.addCardEventListener(hands => this.setCardNumber(hands));
  }

  private nextPhase() {
    return this.phaseStrategy.get(this.phase)();
  }

  public getPhase() {
    return this.phase;
  }

  public initTurn() {
    this.phaseWait = 60;
    this.phase = GamePhase.Summon;
    return GamePhase.Summon;
  }

  private summonPhase() {
    this.phaseWait -= 1;
    // 次フェーズへ
    if (this.phaseWait <= 0) {
      this.phaseWait = 60;
      this.phase = GamePhase.Buy;
      return GamePhase.Buy;
    }
  }

  private buyPhase() {
    this.phaseWait -= 1;
    // 次フェーズへ
    if (this.phaseWait <= 0) {
      this.phaseWait = 60;
      this.phase = GamePhase.CleanUp;
      return GamePhase.CleanUp;
    }
  }

  private cleanUpPhase() {
    this.phaseWait -= 1;
    // 次フェーズへ
    if (this.phaseWait <= 0) {
      this.phaseWait = 60;
      this.phase = GamePhase.EndOfTurn;
      return GamePhase.EndOfTurn;
    }
  }

  public setCardNumber(hands: CardList) {
    this.handNumber.text = hands.count.toString();
  }

  public setLocalPlayer(isLocalPlayer: boolean = true) {
    this.isLocalPlayer = isLocalPlayer;
    this.hands.setLocalPlayer(isLocalPlayer);
    this.trash.setLocalPlayer(isLocalPlayer);
    this.deck.setLocalPlayer(isLocalPlayer);
  }

  public draw(num: number = 1) {
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

  public update(delta: number) {
    super.update(delta);
    this.nextPhase();
  }
}
