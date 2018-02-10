import GameManager from './game-manager';
import { Container } from 'pixi.js';
import Supply from './supply';
import CardStatusList from './card-status-list';
import CardStatus from './card-status';

export default class GameManagerBuilder {
  private gameManager: GameManager;
  private playerNumber: number;
  private characterSupplies: Supply[];
  private cardStatusList: CardStatusList;
  private localPlayerPosition: number;
  private root: Container;
  private initialDeck: CardStatus[];

  constructor() {
    this.gameManager = new GameManager();
  }

  setRoot(root: Container): GameManagerBuilder {
    this.root = root;
    return this;
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

  setLocalPlayerPosition(localPlayerPosition: number): GameManagerBuilder {
    this.localPlayerPosition = localPlayerPosition;
    return this;
  }

  setInitialDeck(initialDeck: CardStatus[]): GameManagerBuilder {
    this.initialDeck = initialDeck;
    return this;
  }

  build(): GameManager {
    this.gameManager.init(
      this.playerNumber,
      this.characterSupplies,
      this.cardStatusList,
      this.root,
      this.localPlayerPosition,
      this.initialDeck
    );
    return this.gameManager;
  }
}
