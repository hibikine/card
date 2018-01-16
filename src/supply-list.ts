import GameObject from './game-object';
import Supply from './supply';
import GamePhase from './game-phase';

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
    const supplyNumberTable: any = { // TODO:
      1: {
        characterSupplies: 4,
        energySupplies: {
          1: 20,
          2: 10,
          3: 5,
        },
        scoreSupplies: {
          1: 8,
          2: 4,
          3: 3,
        }
      }
    };

    this.characterSupplies = characterSupplies;
    this.energySupplies = energySupplies;
    this.scoreSupplies = scoreSupplies;
    this.supplies.push(...this.characterSupplies);
    this.supplies.push(...this.energySupplies);
    this.supplies.push(...this.scoreSupplies);

    this.characterSupplies.map(v => v.setSize(supplyNumberTable[playerNumber].characterSupplies));
    // TODO:
  }

  /**
   * ゲームのフェーズを指定する
   * @param {GamePhase} gamePhase
   */
  setGamePhase(gamePhase: GamePhase) {
    this.supplies.map(i => i.setGamePhase(gamePhase));
  }

  /**
   * 現在のコストを指定し、それぞれのサプライが購入可能かどうか表示する
   * @param {number} cost
   */
  setCost(cost: number) {
    this.supplies.map(i => i.setCost(cost));
  }

  /**
   * サプライが規定枚数だけ枯渇して終了条件を満たしているか
   * @returns {boolean}
   */
  isSupplyEmptied() {
    return (
      this.characterSupplies.reduce((count, v) => count + (v.isEmpty() ? 1 : 0), 0) >= 3 ||
      this.energySupplies.some(v => v.isEmpty()) ||
      this.scoreSupplies.some(v => v.isEmpty())
    );
  }
}
