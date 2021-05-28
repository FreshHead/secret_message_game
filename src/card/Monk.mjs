import Card from "./Card.mjs"
export default class Monk extends Card {
    constructor() {
        super("Священник", 2)
    }

    play(player, opponent) {
        console.log(`Сыграв ${this}, ${player.name} смотрит карту ${opponent.name}. Это ${opponent.showCard()}`)
    }
}