import Card from '../card';
import CardStatus from '../card-status';

const sampleCardStatus = new CardStatus(
  0,
  0,
  'Sample Card',
  null,
  [],
  'Hello World!'
);

describe('card', () => {
  test('create card with no error', () => {
    const card = new Card(sampleCardStatus);
    expect(card).not.toBeNull();
  });
});
