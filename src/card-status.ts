import { Texture } from 'pixi.js';

export enum CardType {
  Energy = 0,
  Score,
  Character,
  Energy1,
  Energy2,
  Energy3,
  Score1,
  Score2,
  Score3,
}

export default class CardStatus {
  public readonly id: number;
  public readonly cost: number;
  public readonly name: string;
  public readonly texture: Texture;
  public readonly type: CardType[];
  public readonly text: string;
  public readonly value: number;
  constructor(
    id: number,
    cost: number,
    name: string,
    texture: Texture,
    type: CardType[],
    text: string = '',
    value: number = 0,
  ) {
    this.id = id;
    this.cost = cost;
    this.name = name;
    this.texture = texture;
    this.type = type;
    this.text = text;
    this.value = value;

  }
}
