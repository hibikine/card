import Card from './card';
import CardList, { CardEventListener } from './components/card-list';
import appConfig from './app-config';
import setCardsPosition from './set-supplies-position';
import { setWidthWithTextureAspect } from './sprite-utils';
import IGameComponent from './game-component';
import GameObject from './game-object';

export default class Hands extends CardList {
  public readonly fields: CardList;
  private isLocalPlayer: boolean = false;
  private isShowHands: boolean = true;
  private generatedEventListener: CardEventListener | null = null;

  public get name() {
    return 'Hands';
  }

  constructor(cards: Card[]) {
    super(cards);
    this.gameObject.visible = false;
    this.addCardEventListener(this.render.bind(this));
    this.fields = new CardList();
    this.gameObject.addChild(this.fields.gameObject);
    this.render();
  }

  use(card: Card, cost: number = 0) {
    this.remove(card);
    card.use(cost);
    return this.fields.push(card);
  }

  setLocalPlayer(isLocalPlayer: boolean) {
    this.isLocalPlayer = isLocalPlayer;
    if (isLocalPlayer) {
      this.setShowHands(true);
    }
    this.render();
  }

  setShowHands(isShowHands: boolean) {
    this.isShowHands = isShowHands;
    this.render();
  }

  render(): void {
    if (this.isLocalPlayer && this.isShowHands) {
      if (this.gameObject != null) {
        this.gameObject.visible = true;
      }
      this.cards.map(card => {
        card.setVisible(true);
        setWidthWithTextureAspect(card.gameObject, appConfig.width / 10);
      });
      if (this.count > 0) {
        setCardsPosition(
          this.cards.map(c => c.gameObject),
          1,
          100,
          appConfig.height - this.cards[0].gameObject.height
        );
      }
    } else {
      this.visible = false;
    }
  }
}
