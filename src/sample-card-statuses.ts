import {CardStatusObject} from "./card-status-list";
import {CardType} from "./card-status";

const sampleCardStatuses: CardStatusObject[] = [
  {
    name: 'ななし',
    cost: 2,
    image: 'img/card/nanashi.png',
    type: [CardType.Character],
    text: 'ウォークマンの774から生まれたうさぎ。'
  },
  {
    name: 'ジョン',
    cost: 6,
    image: 'img/card/dragon.png',
    type: [CardType.Character],
  },
  {
    name: 'にゃん',
    cost: 3,
    image: 'img/card/nyan.png',
    type: [CardType.Character],
  },
  {
    name: 'いちみ',
    cost: 4,
    image: 'img/card/ichimi.png',
    type: [CardType.Character],
  },
  {
    name: '代理',
    cost: 3,
    image: 'img/card/dairi.png',
    type: [CardType.Character],
  },
  {
    name: 'ガーネット',
    cost: 5,
    image: 'img/card/garnet.png',
    type: [CardType.Character],
  },
  {
    name: 'ヤン',
    cost: 4,
    image: 'img/card/yarn.png',
    type: [CardType.Character],
  },
];

export default sampleCardStatuses;

