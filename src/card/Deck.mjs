import { initUi } from "./deckRendering.mjs";

export default class Deck {
  cardQuantity = {
    Gurdian: 5,
    Monk: 2,
    Baron: 2,
    Maid: 2,
    Prince: 2,
    King: 1,
    Countess: 1,
    Princess: 1,
  };
  cardDict = new Map([
    ["Gurdian", { name: 'Стражница', value: 1, filename: 'guardian.png' }],
    ["Monk", { name: 'Священник', value: 2, filename: 'monk.png' }],
    ["Baron", { name: 'Барон', value: 3, filename: 'baron.png' }],
    ["Maid", { name: 'Служанка', value: 4, filename: 'maid.png' }],
    ["Prince", { name: 'Принц', value: 5, filename: 'prince.png' }],
    ["King", { name: 'Король', value: 6, filename: 'king.png' }],
    ["Countess", { name: 'Графиня', value: 7, filename: 'countess.png' }],
    ["Princess", { name: 'Принцесса', value: 8, filename: 'princess.png' }],
  ]);
  cards = new Array(16);

  /**
   * param {Array} cards - specific cards for deck. Usefull for testing.
   */
  constructor(cards) {
    if (cards) {
      this.cards = cards;
      return;
    }

    let fillIdx = 0;
    // Fill the deck
    for (let cardType in this.cardQuantity) {
      this.cards = this.cards.fill(
        this.cardDict.get(cardType),
        fillIdx,
        (fillIdx += this.cardQuantity[cardType])
      );
    }
    // Shuffle cards
    this.cards = this.cards.sort(() => Math.floor(Math.random() * 3 - 1));
    this.cards = initUi(this.cards);
  }

  get length() {
    return this.cards.length;
  }

  getCard() {
    return this.cards.pop();
  }
}
