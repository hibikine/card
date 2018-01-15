import Player from './player';
import Supply from "./supply";
import SupplyList from "./supply-list";

export default class GameManager {
  private _player: Player[];
  private _supplyList: SupplyList;
  private supplyBuilder: SupplyListBuilder;
  constructor() {
    this._supplyList = new SupplyList();
  }
  init(playerNumber: number, characterSupplies: Supply[]) {
    this._player = new Array<Player>(n).fill(null).map(() => new Player());
    this._supplyList.initSupply(n, characterSupplies, generateEnergySupplies(), generateScoreSupplies());

  }
  update(delta: number) {

  }
}

export class GameManagerBuilder {
  private gameManager: GameManager;
  constructor() {
    this.gameManager = new GameManager();
  }
  playerNumber(n: number): GameManagerBuilder {
    this.gameManager.setPlayerNumber(n);
    return this;
  }
  supply(characterSupplies: Supply[]) {
    this.gameManager.setSupply(characterSupplies);
    return this;
  }
  build(): GameManager {
    return this.gameManager;
  }
}
