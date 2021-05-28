import Deck from "./card/Deck.mjs"
import User from "./player/User.mjs"
import AI from "./player/AI.mjs"
console.log("Игра началась!")

let grave = []
let deck = new Deck()
let user = new User(deck, grave), ai = new AI(deck, grave)
gameLoop()

function gameLoop() {
    setTimeout(() => {
        if (isGameOver()) {
            return;
        } else {
            console.log(`Положение дел: ${user} ${ai}`)
            user.makeTurn(ai)
        }

        if (isGameOver()) {
            return;
        } else {
            ai.makeTurn(user)
        }

        gameLoop();
    }, 1000)
}


function isGameOver() {
    if (user.isDead) {
        console.log('Игрок проиграл')
        return true
    }
    if (ai.isDead) {
        console.log('ИИ проиграл')
        return true
    }
    if (deck.length === 0) {
        if (user.points > ai.points) {
            console.log(`Вы выиграли! ${user} x  ${ai}`)
        } else {
            console.log(`Вы проиграли!  ${user} x  ${ai}`)
        }
        console.log("Игра окончена!")
        return true
    }
    return false
}
