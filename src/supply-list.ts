import GameObject from './game-object';
import Supply from './supply';
import GamePhase from './game-phase';
import appConfig from './app-config';
import supplyNumberTable from './supply-number-table';
import setSuppliesPosition, { defaultValue } from './set-supplies-position';
import { last } from './utils';
import { setWidthWithTextureAspect } from './sprite-utils';
import style from './style';

export default class SupplyList extends GameObject {
  private supplies: Supply[] = [];
  private characterSupplies: Supply[] = [];
  private energySupplies: Supply[] = [];
  private scoreSupplies: Supply[] = [];

  /**
   * サプライを初期化する
   */
  initSupply(playerNumber: number,
             characterSupplies: Supply[],
             energySupplies: Supply[],
             scoreSupplies: Supply[]) {

    this.characterSupplies = characterSupplies;
    this.energySupplies = energySupplies;
    this.scoreSupplies = scoreSupplies;

    // 全部のサプライをまとめた配列に入れる
    this.supplies.push(...this.characterSupplies);
    this.supplies.push(...this.energySupplies);
    this.supplies.push(...this.scoreSupplies);

    this.supplies.map(s => this.addChild(s));

    // カードサイズ
    this.supplies.map((supply) => {
      setWidthWithTextureAspect(supply,  appConfig.width / 9);
    });

    // サプライの位置
    {
      const y = style.supplyList.characterSupplies.y;
      const scaleX = style.supplyList.characterSupplies.scaleX;
      setSuppliesPosition(this.characterSupplies, 2, 0, y, scaleX);

      const lastCard = last(this.characterSupplies);
      const offsetX = lastCard.x + lastCard.width * scaleX;
      setSuppliesPosition(this.energySupplies, 1, offsetX, y, scaleX);
      setSuppliesPosition(this.scoreSupplies, 1, offsetX, lastCard.y, scaleX);
    }

    this.characterSupplies.map(v => v.setSize(supplyNumberTable[playerNumber].characterSupplies));
    // TODO:
  }

  /**
   * ゲームのフェーズを指定する
   {GamePhase} gamePhase
   */
  setGamePhase(gamePhase: GamePhase) {
    this.supplies.map(i => i.setGamePhase(gamePhase));
  }

  /**
   * 現在のコストを指定し、それぞれのサプライが購入可能かどうか表示する
   {number} cost
   */
  setCost(cost: number) {
    this.supplies.map(i => i.setCost(cost));
  }

  /**
   * サプライが規定枚数だけ枯渇して終了条件を満たしているか
   {boolean}
   */
  isSupplyEmptied() {
    return (
      this.characterSupplies.reduce((count, v) => count + (v.isEmpty() ? 1 : 0), 0) >= 3 ||
      this.energySupplies.some(v => v.isEmpty()) ||
      this.scoreSupplies.some(v => v.isEmpty())
    );
  }
}
