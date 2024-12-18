import { initUi } from "./playerRendering.mjs";

export function createAi(name, firstCard) {
    return initUi(
        createPlayer(name, 'ai', firstCard),
        document.getElementById('opponents')
    )
}

export function createUser(name, firstCard) {
    return initUi(
        createPlayer(name, 'user', firstCard),
        document.getElementById('user')
    )
}

function createPlayer(name, type, firstCard) {
    return {
        type,
        name,
        hand: [firstCard],
        isImmune: false,
        isDead: false,
        isMakingTurn: false,
        isWinner: false
    }
}
