import Player from "./Player.mjs"
export default class AI extends Player {
    constructor(deck, grave) {
        super("ИИ", deck, grave)
    }
}