import GameObject from './game-object';
import CardStatus from './card-status';
import { Sprite, loader } from 'pixi.js';
import { Image } from './files';
import Text = PIXI.Text;
import style from './style';
import { setWidthWithTextureAspect } from './sprite-utils';

const { resources } = loader;

export default class CardDetail extends GameObject {
  picture: Sprite = new Sprite();
  text: Text = new Text();
  costText: Text = new Text();
  cardBack: Sprite;

  constructor() {
    super();
    const { picture, text, costText } = this;

    const cardBack = new Sprite(resources[Image.CardTall].texture);
    this.cardBack = cardBack;

    this.position.set(style.cardDetail.x, style.cardDetail.y);
    [cardBack, picture, text, costText].map((component) => {
      component.anchor.set(1, 1);
      this.addChild(component);
    });
    this.visible = false;
  }

  set cardStatus(cardStatus: CardStatus) {
    const { picture, cardBack } = this;
    picture.texture = cardStatus.texture;
    this.text.text = cardStatus.text;
    this.costText.text = cardStatus.cost.toString();
    picture.x = -10;
    picture.y = -cardBack.height + 40 + picture.texture.height;
    setWidthWithTextureAspect(picture, 300);
  }
}
