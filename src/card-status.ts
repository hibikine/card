import {Texture} from 'pixi.js';

export enum CardType {
  Energy = 0,
  Score,
  Character,
}

export default class CardStatus {
  public readonly id: number;
  public readonly cost: number;
  public readonly name: string;
  public readonly texture: Texture;
  public readonly type: CardType[];
  constructor(id: number, cost: number, name: string, texture: Texture, type: CardType[]) {
    this.id = id;
    this.cost = cost;
    this.name = name;
    this.texture = texture;
    this.type = type;
  }
}
