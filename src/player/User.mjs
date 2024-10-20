import Player from "./Player.mjs";
export default class User extends Player {
    constructor(firstCard) {
        super('Игрок', firstCard)
    }
}
