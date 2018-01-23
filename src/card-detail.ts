import GameObject from './game-object';
import { loader, Sprite } from 'pixi.js';
import { Image } from './files';
import style from './style';
import { setWidthWithTextureAspect } from './sprite-utils';
import Card from './card';
import Text = PIXI.Text;

const { resources } = loader;

const cardTextStyle = { fontSize: 16 };

export default class CardDetail extends GameObject {
  picture: Sprite = new Sprite();
  text: Text = new Text('', cardTextStyle);
  costText: Text = new Text();
  nameText: Text = new Text();
  cardBack: Sprite;
  cardObject: Card;

  constructor() {
    super();
    const { picture, text, nameText, costText } = this;

    const cardBack = new Sprite(resources[Image.CardTall].texture);
    this.cardBack = cardBack;

    this.position.set(style.cardDetail.x, style.cardDetail.y);
    [cardBack, picture, text, nameText, costText].map((component) => {
      component.anchor.set(1, 1);
      this.addChild(component);
    });

    this.text.anchor.set(0, 0);
    this.text.x = -this.cardBack.texture.width;
    this.text.y = -30;

    this.costText.x = -20;
    this.costText.y = -this.cardBack.texture.height + 40;

    this.nameText.anchor.set(0, 1);
    this.nameText.x = -this.cardBack.texture.width + 10;
    this.nameText.y = this.costText.y;

    this.visible = false;
  }

  get card() {
    return this.cardObject;
  }

  set card(card: Card) {
    const { picture, text, costText, nameText, cardBack } = this;
    const { cardStatus } = card;
    this.cardObject = card;
    picture.texture = cardStatus.texture;
    text.text = cardStatus.text;
    costText.text = cardStatus.cost.toString();
    nameText.text = cardStatus.name;
    picture.x = -10;
    picture.y = -cardBack.height + 40 + picture.texture.height;
    setWidthWithTextureAspect(picture, 300);
  }
}
