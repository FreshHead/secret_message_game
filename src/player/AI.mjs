import Player from "./Player.mjs"
export default class User extends Player {
    constructor(deck, grave) {
        super("ИИ", deck, grave)
    }
}