import Player from "./Player.mjs"
export default class AI extends Player {
    constructor(name, firstCard) {
        super(name, firstCard)
    }

    chooseCardAndOponent(opponents) {
        const desiredCard = Math.random() > 0.5 ? this.hand.shift() : this.hand.pop();
        const card = this.isCanBePlayed(desiredCard, this.hand[0]) ? desiredCard : this.hand[0];
        return {
            card,
            opponent: opponents[Math.floor(Math.random() * (opponents.length - 1))]
        }
    }
}
