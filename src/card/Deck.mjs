import Gurdian from "./Gurdian.mjs";
import Monk from "./Monk.mjs";
import Baron from "./Baron.mjs";
import Maid from "./Maid.mjs";
import Prince from "./Prince.mjs";
import King from "./King.mjs";
import Countess from "./Countess.mjs";
import Princess from "./Princess.mjs";

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
    ["Gurdian", Gurdian],
    ["Monk", Monk],
    ["Baron", Baron],
    ["Maid", Maid],
    ["Prince", Prince],
    ["King", King],
    ["Countess", Countess],
    ["Princess", Princess],
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
        new (this.cardDict.get(cardType))(),
        fillIdx,
        (fillIdx += this.cardQuantity[cardType]),
      );
    }
    // Shuffle cards
    this.cards = this.cards.sort((a, b) => Math.floor(Math.random() * 3 - 1));
  }

  get length() {
    return this.cards.length;
  }

  getCard() {
    return this.cards.unshift();
  }
}
