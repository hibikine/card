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
import Sprite = PIXI.Sprite;
import appConfig from './app-config';
import { setWidthWithTextureAspect } from './sprite-utils';

const { resources } = loader;

export default class Player extends GameObject {
  private sprite: Sprite;
  private hands: Hands;
  private deck: Deck;
  private trash: Trash;

  private handNumberText: Text;
  private nameText: Text;

  private playerNumber: number;
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
    super();

    this.sprite = new Sprite(resources[Image.CardBack].texture);
    this.sprite.y = 40;

    this.deck = new Deck(initialDeck);
    const cards = this.deck.drawCards(Rules.InitialDrawCards);
    this.hands = new Hands(cards);
    this.trash = new Trash();

    {
      this.handNumberText = new Text(
        this.hands.count.toString(),
        { fontSize: 100, fill: 0xffffff });

      const { handNumberText, sprite } = this;
      handNumberText.anchor.set(1, 1);
      handNumberText.position.set(sprite.width, sprite.height);
      sprite.addChild(handNumberText);
    }

    {
      this.nameText = new Text(
        this.name,
        { fontSize: 50, fill: 0xffffff });

      const { nameText, sprite } = this;
      nameText.anchor.set(0, 0);
      nameText.position.set(0, 0);
      sprite.addChild(nameText);
    }

    this.addChild(
      this.sprite,
      this.hands,
      this.deck,
      this.trash,
    );

    this.render();

    this.hands.addCardEventListener(hands => this.setCardNumber(hands.count));
  }

  public setName(name: string): string {
    this.name = name;
    this.nameText.text = this.name;
    return name;
  }

  public setPlayerNumber(number: number): number {
    this.playerNumber = number;
    this.render();
    return number;
  }

  private nextPhase() {
    return this.phaseStrategy.get(this.phase)();
  }

  public getPhase() {
    return this.phase;
  }

  public initTurn() {
    this.phaseWait = 60;
    this.summonableCount = 1;
    this.buyableCount = 1;
    this.energy = 0;
    this.phase = GamePhase.Summon;
    return GamePhase.Summon;
  }

  private summonPhase() {
    if (this.summonableCount < 0) {
      this.phaseWait -= 1;
    }
    // 次フェーズへ
    if (this.phaseWait <= 0) {
      this.phaseWait = 60;
      this.phase = GamePhase.Buy;
      return GamePhase.Buy;
    }
  }

  private buyPhase() {
    if (this.buyableCount < 0) {
      this.phaseWait -= 1;
    }
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

  public setCardNumber(count: number) {
    this.handNumberText.text = count.toString();
  }

  public setLocalPlayer(isLocalPlayer: boolean = true) {
    this.isLocalPlayer = isLocalPlayer;
    [
      this.hands,
      this.trash,
      this.deck,
    ].map(cardList => cardList.setLocalPlayer(isLocalPlayer));
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

  private render() {
    const { playerNumber, sprite } = this;
    const { width } = appConfig;

    {
      const x = width / 5 * (1 + playerNumber);

      sprite.x = x;
      setWidthWithTextureAspect(sprite, width / 8);
    }
  }
}
