import Card from './card';
import CardList, { CardEventListener } from './card-list';
import appConfig from './app-config';
import setCardsPosition from './set-supplies-position';
import { setWidthWithTextureAspect } from './sprite-utils';

export default class Hands extends CardList {
  private isLocalPlayer: boolean = false;
  private generatedEventListener: CardEventListener | null = null;

  constructor(cards: Card[]) {
    super(cards);
    cards.map(card => this.addChild(card));
    this.visible = false;
    this.addCardEventListener(this.render.bind(this));
  }

  use(card: Card, cost: number = 0) {
    this.remove(card);
    card.use(cost);
    return card;
  }

  setLocalPlayer(isLocalPlayer: boolean) {
    this.isLocalPlayer = isLocalPlayer;
    if (isLocalPlayer) {
      this.showHands(true);
    }
  }

  showHands(isShowHands: boolean) {
    if (isShowHands) {
      this.visible = true;
      this.cards.map((v) => {
        v.setFace(true);
        v.visible = true;
      });
      this.generatedEventListener = () => {
        this.render();
      };
      this.addCardEventListener(this.generatedEventListener);
      this.render();
    } else {
      this.cards.map(v => v.visible = false);
      this.deleteCardEventListener(this.generatedEventListener);
    }
  }

  render(): void {
    this.x = 100;
    this.y = 400;
    this.cards.map((card) => {
      setWidthWithTextureAspect(card, appConfig.width / 10);
    });
    setCardsPosition(this.cards, 1, 100, appConfig.height - this.cards[0].height);
  }
}
