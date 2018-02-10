import {} from 'module';
export default interface ICardStatus {
  id: number;
  cost: number;
  name: string;
  texture: Texture;
  type: CardType[];
  text: string;
  value: number;
};
