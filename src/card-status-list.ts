import CardStatus, { CardType } from './card-status';
import { loader } from 'pixi.js';
import Supply from './supply';

export type CardStatusObject = {
  name: string;
  cost: number;
  image: string;
  type: CardType[];
  text?: string;
  value?: number;
};

export const defaultCardStatusObject: CardStatusObject[] = [
  {
    name: '1エネルギー',
    cost: 0,
    image: 'img/card/1.png',
    type: [CardType.Energy, CardType.Energy1],
    value: 1,
  },
  {
    name: '2エネルギー',
    cost: 3,
    image: 'img/card/2.png',
    type: [CardType.Energy, CardType.Energy2],
    value: 2,
  },
  {
    name: '3エネルギー',
    cost: 6,
    image: 'img/card/3.png',
    type: [CardType.Energy, CardType.Energy3],
    value: 3,
  },
  {
    name: '1スコア',
    cost: 0,
    image: 'img/card/score1.png',
    type: [CardType.Score, CardType.Score1],
    value: 1,
  },
  {
    name: '2スコア',
    cost: 3,
    image: 'img/card/score2.png',
    type: [CardType.Score, CardType.Score2],
    value: 2,
  },
  {
    name: '3スコア',
    cost: 6,
    image: 'img/card/score3.png',
    type: [CardType.Score, CardType.Score3],
    value: 3,
  },
];

export function generateSupplies(
  cardStatuses: CardStatus[],
  size: number = 10
) {
  return cardStatuses.map(v => new Supply().init(v, size));
}

export default class CardStatusList extends Array<CardStatus> {
  constructor(additionalCardObjects: CardStatusObject[] = []) {
    const cardObjects = [...defaultCardStatusObject, ...additionalCardObjects];
    super(cardObjects.length);
    this.push(
      ...cardObjects.map(
        (v, i) =>
          new CardStatus(
            i,
            v.cost,
            v.name,
            loader.resources[v.image].texture,
            v.type,
            v.text,
            v.value
          )
      )
    );
  }

  searchByCardType(cardType: CardType): CardStatus[] {
    return this.filter(v => v.type.indexOf(cardType) !== -1);
  }

  generateEnergySupplies(): Supply[] {
    return generateSupplies(
      [CardType.Energy1, CardType.Energy2, CardType.Energy3].map(
        v => this.searchByCardType(v)[0]
      )
    );
  }

  generateScoreSupplies(): Supply[] {
    return generateSupplies(
      [CardType.Score1, CardType.Score2, CardType.Score3].map(
        v => this.searchByCardType(v)[0]
      )
    );
  }

  generateInitialDeck(): CardStatus[] {
    return [
      this[0],
      this[0],
      this[0],
      this[0],
      this[0],
      this[0],
      this[0],
      this[3],
      this[3],
      this[3],
    ];
  }
}
