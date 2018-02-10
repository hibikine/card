import { Text } from 'pixi.js';
import GameObject from './game-object';
import Player from './player';
import CardStatus from './card-status';
import { randomChoice } from './utils';
import GamePhase from './game-phase';
import AutoRandomAIStrategy from './auto-random-ai-strategy';
import LocalPlayerStrategy from './local-player-strategy';

const gamePhaseName: Map<GamePhase, string> = new Map([
  [GamePhase.Summon, '召喚フェーズ'],
  [GamePhase.Buy, '購入フェーズ'],
  [GamePhase.CleanUp, 'クリンナップフェーズ'],
]);

export default class PlayerManager extends GameObject {
  public players: Player[];
  private turnPlayer: Player;
  private turnPlayerText: Text;
  private phaseText: Text;
  constructor(
    playerNumber: number,
    localPlayerPosition: number,
    initialDeck: CardStatus[]
  ) {
    super();
    // プレイヤーの初期化
    const players: Player[] = [];
    this.players = players;
    for (let i: number = 0; i < playerNumber; i += 1) {
      players.push(new Player(initialDeck));
    }
    players[localPlayerPosition].setLocalPlayer();
    players.map((player, i) => {
      player.setName(`プレイヤー${i + 1}`);
      player.setPlayerNumber(i);
      player.playerStrategy = new AutoRandomAIStrategy(player);
    });
    players[localPlayerPosition].playerStrategy = new LocalPlayerStrategy(
      players[localPlayerPosition]
    );

    players.map(p => this.addChild(p));

    // ターンプレイヤーの設定
    this.turnPlayer = randomChoice(players);
    this.turnPlayer.initTurn();
    this.turnPlayerText = new Text(this.turnPlayer.name, { fontSize: 30 });
    this.phaseText = new Text(gamePhaseName.get(this.turnPlayer.getPhase()), {
      fontSize: 15,
    });
    this.phaseText.y = 30;
    this.players.map(player => {
      player.phaseEvent.push((currentPhase, nextPhase) => {
        if (nextPhase === GamePhase.EndOfTurn) {
          return;
        }
        this.phaseText.text = gamePhaseName.get(nextPhase);
      });
    });
    this.addChild(this.turnPlayerText, this.phaseText);

    this.render();
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
      this.setTurnPlayer(
        this.players.reduce((accumulator, player, index): Player => {
          if (player === this.turnPlayer) {
            return this.players[(index + 1) % this.players.length];
          }
          return accumulator;
        }, null)
      );

      this.render();
    }
  }

  private setTurnPlayer(player: Player): Player {
    this.turnPlayer = player;
    this.turnPlayer.initTurn();
    this.render();
    return player;
  }
}
