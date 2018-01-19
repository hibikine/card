import Card from './card';
import CardList, { CardEventListener } from './card-list';
import AppConfig from './app-config';
import Container = PIXI.Container;

export default class Hands extends CardList {
  private isLocalPlayer: boolean = false;
  private generatedEventListener: CardEventListener | null = null;

  constructor(cards: Card[], container: Container) {
    super(cards, container);
    this.visible = false;
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
    this.cards.map((card, i) => {
      card.visible = true;
      card.width = 100;
      card.height = card.width / card.texture.width * card.texture.height;
      // カードがはみ出す場合
      if (AppConfig.width - this.x - card.width * this.count < 0) {
        card.x = AppConfig.width * i / this.count;
      } else {
        card.x = i * 120;
      }
    });
  }
}
