import Card from "./Card.mjs";
export default class Princess extends Card {
  constructor() {
    super("Принцесса", 8);
  }

  play(player) {
    player.isDead = true;
    console.log(`Сбросив ${this} ${player.name} выбывает из игры.`);
  }
}
