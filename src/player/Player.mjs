export default class Player {
  cards = []; // Не может быть более 2-х карт
  isImmune = false; // Этот ход защищён под действием служанки
  isDead = false; // Выбыл из игры
  /**
   * @param {string} name
   * @param {Deck} deck
   * @param {Array} grave
   */
  constructor(name, deck, grave) {
    this.name = name;
    this.grave = grave;
    this.deck = deck;
    this.cards = [this.deck.takeCard()];
  }

  makeTurn(opponent, cardIndex) {
    this.isImmune = false; // Снимаем старый имунитет служанки в начале хода, если он есть.
    this.opponent = opponent;
    this.takeCard();

    const card = this.cards[cardIndex];
    const otherCard = this.cards[1 - cardIndex];
    this.playCard(this.isCanBePlayed(card, otherCard) ? card : otherCard);
  }

  takeCard() {
    this.cards.push(this.deck.getCard());
  }

  playCard(card) {
    card.play(this, this.opponent);
  }

  looseCard(card) {
    if (card.value === 7) {
      this.isDead = true;
    }
    let idx = this.cards.indexOf(card);
    this.cards.splice(idx, 1);
    this.grave.push(card);
  }

  isCanBePlayed(card, otherCard) {
    return otherCard.value !== 7 || card.value === 5 || card.value === 6;
  }

  swapCard(opponent) {
    let a = this.cards.shift();
    let b = opponent.cards.shift();
    this.cards.push(b);
    opponent.cards.push(a);
  }

  changeCard() {
    console.log(`${this.name} сбрасывает ${this.card} и берёт новую.`);
    this.grave.push(this.cards.shift());
    this.takeCard();
  }

  get points() {
    return this.cards[0].value;
  }

  toString() {
    return `${this.name} ${this.cards[0]}`;
  }
}
