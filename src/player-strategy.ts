import Player from './player';

export default class PlayerStrategy {
  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  goNextPhase() {
    return true;
  }
}
