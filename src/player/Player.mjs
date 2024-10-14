export default class Player {
  hand = []; // Не может быть более 2-х карт
  isImmune = false; // Этот ход защищён под действием служанки
  isDead = false; // Выбыл из игры

  /**
   * @param {string} name
   */
  constructor(name, firstCard) {
    this.name = name;
    this.hand = [firstCard];
  }

  looseCard(card) {
    if (card.value === 7) {
      this.isDead = true;
    }
    let idx = this.hand.indexOf(card);
    this.hand.splice(idx, 1);
    this.grave.push(card);
  }

  isCanBePlayed(card, otherCard) {
    return otherCard.value !== 7 || card.value === 5 || card.value === 6;
  }

  swapCard(opponent) {
    let a = this.hand.shift();
    let b = opponent.cards.shift();
    this.hand.push(b);
    opponent.cards.push(a);
  }

  changeCard() {
    console.log(`${this.name} сбрасывает ${this.card} и берёт новую.`);
    this.grave.push(this.hand.shift());
    this.takeCard();
  }

  chooseCardAndOpponent(opponents) {
    return {
      card: this.hand.shift(),
      opponent: opponents[0]
    }
  }

  get score() {
    return this.hand[0].value;
  }
}
