import { CardStatusObject } from './card-status-list';
import { CardType } from './card-status';

const sampleCardStatuses: CardStatusObject[] = [
  {
    name: 'ななし',
    cost: 2,
    image: 'img/card/nanashi.png',
    type: [CardType.Character],
    text: 'ウォークマンの774から生まれたうさぎ。',
  },
  {
    name: 'ジョン',
    cost: 6,
    image: 'img/card/dragon.png',
    type: [CardType.Character],
    text: 'つよい。',
  },
  {
    name: 'にゃん',
    cost: 3,
    image: 'img/card/nyan.png',
    type: [CardType.Character],
    text: '早く全身描いて～～～',
  },
  {
    name: 'いちみ',
    cost: 4,
    image: 'img/card/ichimi.png',
    type: [CardType.Character],
    text: '一味唐辛子から生まれたいちみちゃん！',
  },
  {
    name: '代理',
    cost: 3,
    image: 'img/card/dairi.png',
    type: [CardType.Character],
    text: '響音カゲの代理キャラ',
  },
  {
    name: 'ガーネット',
    cost: 5,
    image: 'img/card/garnet.png',
    type: [CardType.Character],
    text: 'けもーい！',
  },
  {
    name: 'ヤン',
    cost: 4,
    image: 'img/card/yarn.png',
    type: [CardType.Character],
    text: 'どっちだ？',
  },
];

export default sampleCardStatuses;
