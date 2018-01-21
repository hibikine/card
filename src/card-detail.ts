import GameObject from './game-object';
import CardStatus from './card-status';
import { Sprite, loader } from 'pixi.js';
import { Image } from './files';
import Text = PIXI.Text;
import style from './style';

const { resources } = loader;

export default class CardDetail extends GameObject {
  picture: Sprite = new Sprite();
  text: Text = new Text();
  costText: Text = new Text();

  constructor() {
    super();
    const { picture, text, costText } = this;

    const cardBack = new Sprite(resources[Image.CardTall].texture);

    this.position.set(style.cardDetail.x, style.cardDetail.y);
    [cardBack, picture, text, costText].map((component) => {
      component.anchor.set(1, 1);
      this.addChild(component);
    });
  }

  set cardStatus(cardStatus: CardStatus) {
    this.picture.texture = cardStatus.texture;
    this.text.text = cardStatus.text;
    this.costText.text = cardStatus.cost.toString();
  }
}
