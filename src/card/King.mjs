import Card from "./Card.mjs"
export default class King extends Card {
    constructor() {
        super("Король", 6)
    }

    play(player, opponent) {
        console.log(`Сыграв ${this}, ${player.name} должен поменяться картами с ${opponent.name}.`)
        if (super.immuneCheck(opponent))
            return
        player.swapCard(opponent)
        console.log(`${player} обменялся картами с ${opponent}`)
    }
}