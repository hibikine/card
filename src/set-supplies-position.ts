import Supply from './supply';
import Container = PIXI.Container;

export const defaultValue = {
  row: 1,
  offsetX: 0,
  offsetY: 0,
  scaleX: 1.1,
  scaleY: 1.3,
};

/**
 * カードを等間隔でいい感じに並べます
 * @param {Supply[]} supplies
 * @param {number} row
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {number} scaleX
 * @param {number} scaleY
 */
export default function setCardsPosition(
  supplies: Container[],
  row: number = defaultValue.row,
  offsetX: number = defaultValue.offsetX,
  offsetY: number = defaultValue.offsetY,
  scaleX: number = defaultValue.scaleX,
  scaleY: number = defaultValue.scaleY
) {
  supplies.map((v, i) => {
    v.x = (i % (supplies.length / row)) * v.width * scaleX + offsetX;
    v.y = ((i * row / supplies.length) | 0) * v.height * scaleY + offsetY;
  });
}
