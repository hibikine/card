import Player from './player';
import Supply from "./supply";
import SupplyList from "./supply-list";
import CardStatusList from "./card-status-list";
import {randomChoice} from "./utils";

export default class GameManager {
  private players: Player[];
  private supplyList: SupplyList;
  private cardStatusList: CardStatusList;
  private turnPlayer: Player;
  constructor() {
    this.supplyList = new SupplyList();
  }
  init(playerNumber: number, characterSupplies: Supply[], cardStatusList: CardStatusList) {
    this.players = new Array<Player>(playerNumber).fill(null).map(() => new Player());
    this.supplyList.initSupply(
      playerNumber,
      characterSupplies,
      this.cardStatusList.generateEnergySupplies(),
      this.cardStatusList.generateScoreSupplies()
    );
    this.turnPlayer = randomChoice(this.players);
  }
  update(delta: number) {

  }
}

export class GameManagerBuilder {
  private gameManager: GameManager;
  private _playerNumber: number;
  private _characterSupplies: Supply[];
  private _cardStatusList: CardStatusList;
  constructor() {
    this.gameManager = new GameManager();
  }
  playerNumber(n: number): GameManagerBuilder {
    this._playerNumber = n;
    return this;
  }
  supply(characterSupplies: Supply[]): GameManagerBuilder {
    this._characterSupplies = characterSupplies;
    return this;
  }
  cardStatusList(cardStatusList: CardStatusList): GameManagerBuilder {
    this._cardStatusList = cardStatusList;
    return this;
  }
  build(): GameManager {
    this.gameManager.init(this._playerNumber, this._characterSupplies, this._cardStatusList);
    return this.gameManager;
  }
}
