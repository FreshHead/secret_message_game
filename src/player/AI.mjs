import Player from "./Player.mjs"
export default class AI extends Player {
    constructor(name, firstCard) {
        super(name, firstCard)
    }

    chooseCardAndTarget(opponents) {
        const desiredCard = Math.random() > 0.5 ? this.hand.shift() : this.hand.pop();
        const card = this.isCanBePlayed(desiredCard, this.hand[0]) ? desiredCard : this.hand[0];
        const cardToKill = card.value === 1 ? Math.floor(Math.random() * (8 - 1)) + 1: null

        const target = opponents[Math.floor(Math.random() * (opponents.length - 1))];

        return {
            card,
            target,
            cardToKill
        }
    }



}
