import Card from "./Card.mjs"
export default class Prince extends Card {
    constructor() {
        super("Принц", 5)
    }

    play(player, opponent) {
        // TODO: Дай возможность игроку выбрать кто сбрасывает карту, он или соперник.
        console.log(`${player.name} играет ${this}. ${opponent.name} должен сбросить карту.`)
        if (super.immuneCheck(opponent))
            return

        opponent.changeCard()
    }
}