import Player from "./Player.mjs";
export default class User extends Player {
  constructor(deck, grave) {
    console.log(deck);
    super("Игрок", deck, grave);
  }
}
