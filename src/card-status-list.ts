import {CardType} from "./card-status";
import CardStatus from "./card-status";
import {loader} from "pixi.js";
import Supply from "./supply";

export type CardStatusObject = {
  name: string,
  cost: number,
  image: string,
  type: CardType[],
  text?: string,
};

const defaultCardStatusObject: CardStatusObject[] = [
  {
    name: '1エネルギー',
    cost: 0,
    image: 'img/card/1.png',
    type: [CardType.Energy, CardType.Energy1],
  },
  {
    name: '2エネルギー',
    cost: 3,
    image: 'img/card/2.png',
    type: [CardType.Energy, CardType.Energy2],
  },
  {
    name: '3エネルギー',
    cost: 6,
    image: 'img/card/3.png',
    type: [CardType.Energy, CardType.Energy3],
  },
  {
    name: '1スコア',
    cost: 0,
    image: 'img/card/1.png',
    type: [CardType.Score, CardType.Score1],
  },
  {
    name: '2スコア',
    cost: 3,
    image: 'img/card/2.png',
    type: [CardType.Score, CardType.Score2],
  },
  {
    name: '3スコア',
    cost: 6,
    image: 'img/card/3.png',
    type: [CardType.Score, CardType.Score3],
  },
];

export function generateSupplies(cardStatuses: CardStatus[], size: number = 10) {
  return cardStatuses.map(v => (
    new Supply().init(v, size)
  ));
}

export default class CardStatusList extends Array<CardStatus> {
  constructor(additionalCardObjects?: CardStatusObject[]) {
    if (additionalCardObjects === undefined) {
      additionalCardObjects = [];
    }
    const cardObjects = [...defaultCardStatusObject, ...additionalCardObjects];
    super(cardObjects.length);
    this.push(...cardObjects.map(
      (v, i) => (
        new CardStatus(i, v.cost, v.name, loader.resources[v.image].texture, v.type)
      )
    ));
  }

  searchByCardType(cardType: CardType): CardStatus[] {
    return this.filter(v => v.type.indexOf(cardType) !== -1);
  }

  generateEnergySupplies(): Supply[] {
    return generateSupplies(
      [CardType.Energy1, CardType.Energy2, CardType.Energy3].map(
        v => (
          this.searchByCardType(v)[0]
        )
      )
    );
  }

  generateScoreSupplies(): Supply[] {
    return generateSupplies(
      [CardType.Score1, CardType.Score2, CardType.Score3].map(
        v => (
          this.searchByCardType(v)[0]
        )
      )
    );
  }
}
