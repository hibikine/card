import Player from './player';
import Supply from './supply';
import SupplyList from './supply-list';
import CardStatusList from './card-status-list';
import { randomChoice } from './utils';
import appConfig from './app-config';

export default class GameManager {
  private players: Player[];
  private supplyList: SupplyList;
  private cardStatusList: CardStatusList;
  private turnPlayer: Player;

  constructor() {
    this.supplyList = new SupplyList();
  }

  setPlayerPosition() {
    this.players.map((v, i) => {
      v.x = appConfig.width / 8 + appConfig.width / 4 * i;
      v.y = appConfig.height / 6;
      v.width = appConfig.width / 8;
      v.height = v.width * 3 / 4;
    });
  }

  init(playerNumber: number, characterSupplies: Supply[], cardStatusList: CardStatusList) {
    this.cardStatusList = cardStatusList;
    this.players = [];
    for (let i: number = 0; i < playerNumber; i += 1) {
      this.players.push(new Player());
    }
    this.setPlayerPosition();
    this.supplyList.initSupply(
      playerNumber,
      characterSupplies,
      this.cardStatusList.generateEnergySupplies(),
      this.cardStatusList.generateScoreSupplies(),
    );
    this.turnPlayer = randomChoice(this.players);
  }

  update(delta: number) {
  }
}

export class GameManagerBuilder {
  private gameManager: GameManager;
  private playerNumber: number;
  private characterSupplies: Supply[];
  private cardStatusList: CardStatusList;

  constructor() {
    this.gameManager = new GameManager();
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

  build(): GameManager {
    this.gameManager.init(this.playerNumber, this.characterSupplies, this.cardStatusList);
    return this.gameManager;
  }
}
