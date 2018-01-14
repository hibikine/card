import {Application, loader} from 'pixi.js';
import Card from './card';
import CardStatus, {CardType} from './card-status';
import GameObject from './game-object';
import {ImageFiles} from  './files';

loader
  .add(ImageFiles)
  .load(setup);

const appConfig = {
  width: 640,
  height: 480,
};

const app = new Application(appConfig);

document.body.appendChild(app.view);
app.renderer.backgroundColor = 0xfafafa;

const testCardStatusJson = [
  {
    name: '1エネルギー',
    cost: 0,
    image: 'img/card/1.png',
    type: [CardType.Energy],
  },
  {
    name: '2エネルギー',
    cost: 3,
    image: 'img/card/2.png',
    type: [CardType.Energy],
  },
  {
    name: '3エネルギー',
    cost: 6,
    image: 'img/card/3.png',
    type: [CardType.Energy],
  },
];

function generateTestCardStatus(): CardStatus[] {
  return testCardStatusJson.map((v, i) => new CardStatus(i, v.cost, v.name, loader.resources[v.image].texture, v.type));
}


let gameObjectList: GameObject[] = [];
let testCardStatus: CardStatus[] = [];

function setup() {
  app.ticker.add(delta => gameLoop(delta));
  testCardStatus = generateTestCardStatus();
  app.stage.addChild(new Card(testCardStatus[0]));
}

function gameLoop(delta: number) {
  gameObjectList.map(v => v.update(delta));
  gameObjectList = gameObjectList.filter(v => !v.isDestroy);
}
