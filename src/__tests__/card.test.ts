import { defaultCardStatusObject } from "../card-status-list";
import CardStatus from "../card-status";
import Card from "../card";
import style from "../style";
import {loader, __init} from 'pixi.js';

let cardStatuses: CardStatus[];

describe('カードを初期化する', () => {
  beforeEach(() => {
    __init();

    cardStatuses = defaultCardStatusObject.map((v, i) => new CardStatus(
      i,
      v.cost,
      v.name,
      loader.resources[v.image].texture,
      v.type));
  });
  test('初期化したカードの横幅が正しく計算されている', () => {
    const card: Card = new Card(cardStatuses[0]);
    expect(card.width).toBe(style.card.sprite.width);
  });
});
