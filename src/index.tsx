import { Application, loader } from 'pixi.js';
import Card from './card';
import CardStatus from './card-status';
import GameObject from './game-object';
import { imageFiles } from './files';
import CardStatusList, { generateSupplies } from './card-status-list';
import GameManager, { GameManagerBuilder } from './game-manager';
import sampleCardStatuses from './sample-card-statuses';
import appConfig from './app-config';

loader.add(imageFiles).load(setup);

const app = new Application(appConfig);

document.body.appendChild(app.view);
app.renderer.backgroundColor = 0xfafafa;

let gameObjectList: GameObject[] = [];
const testCardStatus: CardStatus[] = [];
let gameManager: GameManager;

function setup() {
  const cardStatusList = new CardStatusList(sampleCardStatuses);
  const characterStatuses = [
    cardStatusList[6],
    cardStatusList[7],
    cardStatusList[8],
    cardStatusList[9],
    cardStatusList[10],
    cardStatusList[11],
    cardStatusList[12],
    cardStatusList[6],
    cardStatusList[7],
    cardStatusList[8],
  ];
  const characterSupplies = generateSupplies(characterStatuses);

  gameManager = new GameManagerBuilder()
    .setPlayerNumber(4)
    .setCardStatusList(cardStatusList)
    .setCharacterSupply(characterSupplies)
    .build();
  app.ticker.add(delta => gameLoop(delta));
  app.stage.addChild(new Card(testCardStatus[0]));
}

function gameLoop(delta: number) {
  gameManager.update(delta);
  gameObjectList.map(v => v.update(delta));
  gameObjectList = gameObjectList.filter(v => !v.isDestroy);
}
