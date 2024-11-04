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


  isCanBePlayed(card, otherCard) {
    return otherCard.value !== 7 || card.value === 5 || card.value === 6;
  }

  get score() {
    return this.hand[0].value;
  }
}
