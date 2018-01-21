import { Sprite, Text, loader } from 'pixi.js';
import CardStatus from './card-status';
import GameObject from './game-object';
import { Image } from './files';
import { setWidthWithTextureAspect } from './sprite-utils';
import style from './style';
import { SpriteAndText } from './utils';
import appConfig from './app-config';

const { resources } = loader;

interface CardStrategy {
  (cost: number): void;
}

export default class Card extends GameObject {
  public readonly cardStatus: CardStatus;
  private readonly sprite: Sprite;
  private readonly nameText: Text;
  private readonly costText: Text;
  private readonly picture: Sprite;
  private readonly components: SpriteAndText[];
  private readonly cardStrategy: CardStrategy;
  private isFaced: boolean = false;

  constructor(cardStatus: CardStatus) {
    super();

    this.sprite = new Sprite(resources[Image.Card].texture);
    this.addChild(this.sprite);

    this.cardStatus = cardStatus;

    this.nameText = new Text(cardStatus.name, style.card.nameText.style);
    this.nameText.x = style.card.nameText.x;
    this.nameText.y = style.card.nameText.y;
    this.addChild(this.nameText);

    this.costText = new Text(String(cardStatus.cost), style.card.costText.style);
    this.costText.x = style.card.costText.x;
    this.costText.y = style.card.costText.y;
    this.addChild(this.costText);

    this.picture = new Sprite(cardStatus.texture);
    setWidthWithTextureAspect(this.picture, style.card.picture.width);
    this.picture.x = style.card.picture.x;
    this.picture.y = style.card.picture.y;
    this.addChild(this.picture);

    this.components = [this.sprite, this.nameText, this.costText, this.picture];

    setWidthWithTextureAspect(this.sprite, style.card.sprite.width);
  }

  setFace(isFaced: boolean) {
    if (this.isFaced !== isFaced) {
      this.isFaced = isFaced;
      if (isFaced) {
        this.sprite.texture = resources[Image.Card].texture;
        this.nameText.visible = true;
        this.costText.visible = true;
        this.picture.visible = true;
      } else {
        this.sprite.texture = resources[Image.CardBack].texture;
        this.nameText.visible = false;
        this.costText.visible = false;
        this.picture.visible = false;
      }
    }
  }

  get tint(): number {
    return this.sprite.tint;
  }

  set tint(tint: number) {

    this.components.map((component: SpriteAndText) => {
      component.tint = tint;
    });
  }

  get width(): number {
    return super.width * this.sprite.texture.width / appConfig.width;
  }

  set width(width: number) {
    super.width = width * appConfig.width / this.sprite.texture.width;
  }

  get height(): number {
    return super.height * this.sprite.texture.height / appConfig.height;
  }

  set height(height: number) {
    super.height = height * appConfig.height / this.sprite.texture.height;
  }

  get texture() {
    return this.sprite.texture;
  }

  use(cost: number) {
    this.cardStrategy(cost);
  }
}
