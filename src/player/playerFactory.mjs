import { initUi } from "./playerRendering.mjs";

export function createAI(firstCard) {
    return initUi({
        ...createPlayer(firstCard),
        chooseCardAndTarget: (opponents) => {
            return {
                card: this.hand.pop(),
                target: opponents[0],
                cardToKill: 1
            }
        }
    },
        document.getElementById('opponents'))
}

export function createUser(firstCard) {
    return initUi({
        ...createPlayer(firstCard),
        chooseCardAndTarget: (opponents) => {
            return {
                card: this.hand.pop(),
                target: opponents[0],
                cardToKill: 1
            }
        }
    }, document.getElementById('user'))
}

function createPlayer(firstCard) {
    return {
        hand: [firstCard],
        isImmune: false,
        isDead: false,
        isMakingTurn: false
    }
}
