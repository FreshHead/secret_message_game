import Card from "./Card.mjs"
export default class Baron extends Card {
    constructor() {
        super("Барон", 3)
    }

    play(player, opponent) {
        console.log(`Сыграв ${this}, ${player.name} должен сравнить карты с ${opponent.name}.`)

        if (super.immuneCheck(opponent))
            return

        console.log(`${player} против ${opponent}`)
        if (player.card.value > opponent.card.value) {
            opponent.isDead = true
        } else if (player.card.value < opponent.card.value) {
            player.isDead = true
        } else {
            console.log(`Ничья. Игра продолжается.`)
        }
    }
}