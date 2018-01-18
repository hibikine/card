import { Sprite, Text, loader } from 'pixi.js';
import CardStatus from './card-status';
import GameObject from './game-object';
import { Image } from './files';
const { resources } = loader;

interface CardStrategy {
  (cost: number): void;
}

export default class Card extends GameObject {
  public readonly cardStatus: CardStatus;
  private readonly nameText: Text;
  private readonly costText: Text;
  private readonly picture: Sprite;
  private readonly cardStrategy: CardStrategy;
  private isFaced: boolean = false;
  constructor(cardStatus: CardStatus) {
    super(resources[Image.Card].texture);
    this.cardStatus = cardStatus;

    this.nameText = new Text(cardStatus.name, { fontSize: 40 });
    this.nameText.x = 10;
    this.nameText.y = 10;
    this.addChild(this.nameText);

    this.costText = new Text(String(cardStatus.cost), { fontSize: 40 });
    this.costText.x = 290;
    this.costText.y = 10;
    this.addChild(this.costText);

    this.picture = new Sprite(cardStatus.texture);
    this.picture.width = 300;
    this.picture.height = this.picture.width * 3 / 4;
    this.picture.x = 10;
    this.picture.y = 60;
    this.addChild(this.picture);

    this.width = 120;
    this.height = this.width * this.texture.height / this.texture.width;
  }

  setFace(isFaced: boolean) {
    if (this.isFaced !== isFaced) {
      this.isFaced = isFaced;
      if (isFaced) {
        this.texture = resources[Image.Card].texture;
        this.nameText.visible = true;
        this.costText.visible = true;
        this.picture.visible = true;
      } else {
        this.texture = resources[Image.CardBack].texture;
        this.nameText.visible = false;
        this.costText.visible = false;
        this.picture.visible = false;
      }
    }
  }

  use(cost: number) {
    this.cardStrategy(cost);
  }
}
