import GameObject from './game-object';
import Hands from './hands';
import Deck from './deck';
import { loader, Sprite, Text } from 'pixi.js';
import { Image } from './files';
import Trash from './trash';
import CardStatus, { CardType } from './card-status';
import Rules from './rules';
import GamePhase from './game-phase';
import appConfig from './app-config';
import { setWidthWithTextureAspect } from './sprite-utils';
import style from './style';
import PlayerStrategy from './player-strategy';

const { resources } = loader;

type PhaseEvent = (currentPhase: GamePhase, nextPhase: GamePhase) => void;

export default class Player extends GameObject {
  public playerStrategy: PlayerStrategy;
  public phaseEvent: PhaseEvent[] = [];
  private sprite: Sprite;
  private hands: Hands;
  private deck: Deck;
  private trash: Trash;
  private handNumberText: Text;
  private nameText: Text;
  private playerNumber: number;
  private isLocalPlayer: boolean = false;
  private localPlayerText: Text;
  private summonableCount: number = 0;
  private energy: number = 0;
  private buyableCount: number = 0;
  private phase: GamePhase = GamePhase.EndOfTurn;
  private phaseWait: number = 0;
  private readonly phaseStrategy: Map<GamePhase, () => GamePhase> = new Map([
    [GamePhase.Summon, this.summonPhase.bind(this)],
    [GamePhase.Buy, this.buyPhase.bind(this)],
    [GamePhase.CleanUp, this.cleanUpPhase.bind(this)],
    [GamePhase.EndOfTurn, () => {}],
  ]);

  constructor(initialDeck: CardStatus[]) {
    super();

    this.playerStrategy = new PlayerStrategy(this);

    this.sprite = new Sprite(resources[Image.CardBack].texture);
    this.sprite.y = 40;

    this.deck = new Deck(initialDeck);
    const cards = this.deck.drawCards(Rules.InitialDrawCards);
    this.hands = new Hands(cards);
    this.trash = new Trash();

    {
      this.handNumberText = new Text(
        this.hands.count.toString(),
        style.player.handNumberText.style
      );

      this.handNumberText.anchor.set(1, 1);
      this.handNumberText.position.set(this.sprite.width, this.sprite.height);
      this.sprite.addChild(this.handNumberText);
    }

    {
      this.nameText = new Text(this.name, { fontSize: 50, fill: 0xffffff });

      this.nameText.anchor.set(0, 0);
      this.nameText.position.set(0, 0);
      this.sprite.addChild(this.nameText);
    }

    this.localPlayerText = new Text('あなた', { fontSize: 50, fill: 0xffffff });
    this.localPlayerText.position.set(0, 50);
    this.localPlayerText.visible = false;
    this.localPlayerText.anchor.set(0, 0);
    this.sprite.addChild(this.localPlayerText);

    this.addChild(this.sprite, this.hands, this.deck, this.trash);

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

  public getPhase() {
    return this.phase;
  }

  public initTurn() {
    this.phaseWait = 60;
    this.summonableCount = 1;
    this.buyableCount = 1;
    this.energy = 0;

    const nextPhase = GamePhase.Summon;
    this.phaseChangeEventCallIfNeed(nextPhase);
    this.phase = nextPhase;

    return GamePhase.Summon;
  }

  public setCardNumber(count: number) {
    this.handNumberText.text = count.toString();
  }

  public setLocalPlayer(isLocalPlayer: boolean = true) {
    this.isLocalPlayer = isLocalPlayer;
    [this.hands, this.trash, this.deck].map(cardList =>
      cardList.setLocalPlayer(isLocalPlayer)
    );
    this.localPlayerText.visible = isLocalPlayer;
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
    this.phase = this.nextPhase();
  }

  private nextPhase() {
    const nextPhase = this.phaseStrategy.get(this.phase)();
    this.phaseChangeEventCallIfNeed(nextPhase);
    return nextPhase;
  }

  private phaseChangeEventCallIfNeed(nextPhase: GamePhase) {
    if (this.phase !== nextPhase) {
      this.phaseEvent.map(e => e(this.phase, nextPhase));
    }
  }

  private summonPhase() {
    if (
      this.summonableCount < 0 || // 召喚可能数が0になる
      this.hands.cards.every(
        // キャラクターカードがない
        card => card.cardStatus.type.every(type => type !== CardType.Character)
      ) ||
      this.playerStrategy.goNextPhase() // 次のフェーズに自ら移動しようとする
    ) {
      this.phaseWait -= 1;
    }
    // 次フェーズへ
    if (this.phaseWait <= 0) {
      this.phaseWait = 60;
      return GamePhase.Buy;
    }
    return GamePhase.Summon;
  }

  private buyPhase() {
    if (
      this.buyableCount < 0 || // 購入可能数が0になる
      this.hands.cards.reduce<number>(
        (sum: number, { cardStatus: { value } }): number => sum + value,
        0
      ) ||
      this.playerStrategy.goNextPhase()
    ) {
      this.phaseWait -= 1;
    }
    // 次フェーズへ
    if (this.phaseWait <= 0) {
      this.phaseWait = 60;
      return GamePhase.CleanUp;
    }
    return GamePhase.Buy;
  }

  private cleanUpPhase() {
    this.phaseWait -= 1;
    // 次フェーズへ
    if (this.phaseWait <= 0) {
      const handCards = this.hands.clear();
      const fieldCards = this.hands.fields.clear();
      [...handCards, ...fieldCards].map(card => this.trash.push(card));
      this.phaseWait = 60;
      return GamePhase.EndOfTurn;
    }
    return GamePhase.CleanUp;
  }

  private render() {
    const { width } = appConfig;

    {
      const x = width / 5 * (1 + this.playerNumber);

      this.sprite.x = x;
      setWidthWithTextureAspect(this.sprite, width / 8);
    }
  }
}
