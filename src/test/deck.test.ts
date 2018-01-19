import Deck from '../deck';
import CardStatus from '../card-status';
import { defaultCardStatusObject } from '../card-status-list';

const cardStatuses: CardStatus[] = defaultCardStatusObject.map((v, i) => new CardStatus(
  i,
  v.cost,
  v.name,
  null,
  v.type));

describe('デッキにカードを入れてシャッフルする', () => {
  test('シャッフルしたカードが複製されたりとかがないかチェック', () => {
    const deck: Deck = new Deck(cardStatuses);
    deck.cards.map((v, i) => {
      deck.cards.map((w, j) => {
        if (i !== j) {
          expect(v).not.toEqual(w);
        }
      });
    });
  });
});

