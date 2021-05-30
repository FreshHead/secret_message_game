import Deck from "./card/Deck.mjs"
import User from "./player/User.mjs"
import AI from "./player/AI.mjs"

infinite()

function infinite() {
    start().then(() => {
        // infinite()
    });
}

async function start() {
    console.log("Игра началась!")

    let grave = []
    let deck = new Deck()
    let user = new User(deck, grave), ai = new AI(deck, grave)

    let curPlayer = user,
        curOpponent = ai
    let turnCount = 1
    let turn = setInterval(() => {
        if (isGameOver(deck, user, ai)) {
            clearInterval(turn)
        } else {
            console.log(`\nХод номер: ${turnCount++}`)
            curPlayer.makeTurn(curOpponent)
            curPlayer = curPlayer === user ? ai : user
            curOpponent = curOpponent === user ? ai : user
        }
    }, 1000)
}



function gameLoop(deck, user, ai) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (isGameOver(deck, user, ai)) {
                console.log("123")
                resolve();
                return;
            } else {
                // console.log(`Положение дел: ${user} ${ai}`)
                user.makeTurn(ai)
            }

            if (isGameOver(deck, user, ai)) {
                console.log("1234")

                resolve();
                return;
            } else {
                ai.makeTurn(user)
            }

            gameLoop(deck, user, ai);
        })
    }, 1000)
}


function isGameOver(deck, user, ai) {
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
