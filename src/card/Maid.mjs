import Card from "./Card.mjs"
export default class Maid extends Card {
    constructor() {
        super("Служанка", 4)
    }

    play(player, opponent) {
        player.isImmune = true
        console.log(`Сыграв ${this}, ${player.name} получил защиту до следующего хода.`)
    }

}