import { Container } from 'pixi.js';
import Supply from './supply';
import SupplyList from './supply-list';
import CardStatusList from './card-status-list';
import CardStatus from './card-status';
import PlayerManager from './player-manager';
import CardDetail from './card-detail';
import Card from './card';

export default class GameManager {
  private playerManager: PlayerManager;
  private supplyList: SupplyList;
  private cardStatusList: CardStatusList;
  private root: Container;

  constructor() {
    this.supplyList = new SupplyList();
  }

  /**
   * ゲームの初期化
   * @param {number} playerNumber
   * @param {Supply[]} characterSupplies
   * @param {CardStatusList} cardStatusList
   * @param {PIXI.Container} root
   * @param {number} localPlayerPosition
   * @param {CardStatus[]} initialDeck
   */
  init(
    playerNumber: number,
    characterSupplies: Supply[],
    cardStatusList: CardStatusList,
    root: Container,
    localPlayerPosition: number = 0,
    initialDeck?: CardStatus[]
  ) {
    this.cardStatusList = cardStatusList;

    if (initialDeck === undefined) {
      this.playerManager = new PlayerManager(
        playerNumber,
        localPlayerPosition,
        cardStatusList.generateInitialDeck()
      );
    } else {
      this.playerManager = new PlayerManager(
        playerNumber,
        localPlayerPosition,
        initialDeck
      );
    }

    // サプライの初期化
    this.supplyList.initSupply(
      playerNumber,
      characterSupplies,
      this.cardStatusList.generateEnergySupplies(),
      this.cardStatusList.generateScoreSupplies()
    );

    Card.cardDetail = new CardDetail();

    // addChild
    this.root = root;
    this.root.addChild(this.supplyList, this.playerManager, Card.cardDetail);
  }

  /**
   * 毎フレーム呼ばれる処理
   * @param {number} delta
   */
  update(delta: number) {
    this.playerManager.update(delta);
  }
}
