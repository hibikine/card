import Card from './card';
import CardList, { CardEventListener } from './card-list';
import appConfig from './app-config';
import setCardsPosition from './set-supplies-position';
import { setWidthWithTextureAspect } from './sprite-utils';

export default class Hands extends CardList {
  private isLocalPlayer: boolean = false;
  private isShowHands: boolean = true;
  private generatedEventListener: CardEventListener | null = null;
  public readonly fields: CardList;

  constructor(cards: Card[]) {
    super(cards);
    this.visible = false;
    this.addCardEventListener(this.render.bind(this));
    this.fields = new CardList();
    this.addChild(this.fields);
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
      this.visible = true;
      this.cards.map((card) => {
        card.visible = true;
        setWidthWithTextureAspect(card, appConfig.width / 10);
      });
      setCardsPosition(this.cards, 1, 100, appConfig.height - this.cards[0].height);
    } else {
      this.visible = false;
    }
  }
}
