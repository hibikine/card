import { Container } from 'pixi.js';
import Player from './player';
import Supply from './supply';
import SupplyList from './supply-list';
import CardStatusList from './card-status-list';
import { randomChoice } from './utils';
import appConfig from './app-config';
import Card from './card';
import CardStatus from './card-status';

export default class GameManager {
  private players: Player[];
  private supplyList: SupplyList;
  private cardStatusList: CardStatusList;
  private turnPlayer: Player;
  private initialDeck: CardStatus[];
  private root: Container;

  constructor() {
    this.supplyList = new SupplyList();
  }

  setPlayerPosition() {
    this.players.map((v, i) => {
      v.x = appConfig.width / 8 + appConfig.width / 4 * i;
      v.y = 0;
      v.width = appConfig.width / 8;
      v.height = v.width * 3 / 4;
    });
  }

  init(playerNumber: number,
       characterSupplies: Supply[],
       cardStatusList: CardStatusList,
       root: Container,
       localPlayerPosition: number = 0,
       initialDeck?: CardStatus[]) {
    this.cardStatusList = cardStatusList;

    if (initialDeck === undefined) {
      this.initialDeck = cardStatusList.generateInitialDeck();
    } else {
      this.initialDeck = initialDeck;
    }

    this.players = [];
    for (let i: number = 0; i < playerNumber; i += 1) {
      const container = new Container();
      root.addChild(container);
      this.players.push(new Player(initialDeck, container));
    }
    this.players[localPlayerPosition].setLocalPlayer();
    this.setPlayerPosition();
    this.supplyList.initSupply(
      playerNumber,
      characterSupplies,
      this.cardStatusList.generateEnergySupplies(),
      this.cardStatusList.generateScoreSupplies(),
    );
    this.turnPlayer = randomChoice(this.players);
    this.root = root;
    this.setRoot();
  }

  private setRoot() {
    this.root.addChild(this.supplyList, ...this.players);
  }

  update(delta: number) {
  }
}

export class GameManagerBuilder {
  private gameManager: GameManager;
  private playerNumber: number;
  private characterSupplies: Supply[];
  private cardStatusList: CardStatusList;
  private localPlayerPosition: number;
  private root: Container;
  private initialDeck: CardStatus[];

  constructor() {
    this.gameManager = new GameManager();
  }

  setRoot(root: Container): GameManagerBuilder {
    this.root = root;
    return this;
  }

  setPlayerNumber(n: number): GameManagerBuilder {
    this.playerNumber = n;
    return this;
  }

  setCharacterSupply(characterSupplies: Supply[]): GameManagerBuilder {
    this.characterSupplies = characterSupplies;
    return this;
  }

  setCardStatusList(cardStatusList: CardStatusList): GameManagerBuilder {
    this.cardStatusList = cardStatusList;
    return this;
  }

  setLocalPlayerPosition(localPlayerPosition: number): GameManagerBuilder {
    this.localPlayerPosition = localPlayerPosition;
    return this;
  }

  setInitialDeck(initialDeck: CardStatus[]): GameManagerBuilder {
    this.initialDeck = initialDeck;
    return this;
  }

  build(): GameManager {
    this.gameManager.init(
      this.playerNumber,
      this.characterSupplies,
      this.cardStatusList,
      this.root,
      this.localPlayerPosition,
      this.initialDeck);
    return this.gameManager;
  }
}
