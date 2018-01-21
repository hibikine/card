import { Text } from 'pixi.js';
import GameObject from './game-object';
import Player from './player';
import CardStatus from './card-status';
import appConfig from './app-config';
import { randomChoice } from './utils';
import GamePhase from './game-phase';

export default class PlayerManager extends GameObject {
  public players: Player[];
  private turnPlayer: Player;
  private turnPlayerText: Text;

  constructor(playerNumber: number, localPlayerPosition: number, initialDeck: CardStatus[]) {
    super();
    // プレイヤーの初期化
    this.players = [];
    for (let i: number = 0; i < playerNumber; i += 1) {
      this.players.push(new Player(initialDeck));
    }
    this.players[localPlayerPosition].setLocalPlayer();
    this.players.map((player, i) => {
      player.setName(`プレイヤー${i + 1}`);
      player.setPlayerNumber(i);
    });
    this.players.map(p => this.addChild(p));

    // ターンプレイヤーの設定
    this.turnPlayer = randomChoice(this.players);
    this.turnPlayer.initTurn();
    this.turnPlayerText = new Text(this.turnPlayer.name, { fontSize: 30 });
    this.addChild(this.turnPlayerText);

    this.render();
  }

  private setTurnPlayer(player: Player): Player {
    this.turnPlayer = player;
    this.render();
    return player;
  }

  count() {
    return this.players.length;
  }

  render() {
    this.turnPlayerText.text = this.turnPlayer.name;
  }

  update(delta: number) {
    super.update(delta);
    this.turnPlayer.update(delta);
    if (this.turnPlayer.getPhase() === GamePhase.EndOfTurn) {
      // ターンプレイヤーを1つ進める
      this.setTurnPlayer(this.players.reduce(
        (accumulator, player, index): Player => {
          if (player === this.turnPlayer) {
            return this.players[(index + 1) % this.players.length];
          }
          return accumulator;
        },
        null),
      );

      this.render();
    }
  }
}
