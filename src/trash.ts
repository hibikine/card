import Card from './card';
import CardList from './card-list';
import Container = PIXI.Container;

export default class Trash extends CardList {
  constructor(container: Container) {
    super([], container);
    this.visible = false;
  }

  /**
   * ローカルでプレイしているユーザーを設定する
   * 要するに今画面の目の前で操作してるユーザーを設定する
   */
  setLocalPlayer(isLocalPlayer: boolean = true) {
    this.visible = isLocalPlayer;
  }

  clear(): Card[] {
    const cards = super.clear();
    this.render();
    return cards;
  }

  render(): void {
    this.position.set(400, 300);
    this.cardList.map(v => v.visible = false);
    if (!this.isEmpty()) {
      this.cardList[this.count - 1].visible = true;
    }
  }
}
