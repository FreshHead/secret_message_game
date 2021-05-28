export default class Player {
    cards = []; // Не может быть более 2-х карт
    isImmune = false; // Этот ход защищён под действием служанки
    isDead = false; // Выбыл из игры
    constructor(name, deck, grave) {
        this.name = name
        this.deck = deck
        this.grave = grave
        this.cards = [this.deck.pop()]
    }



    makeTurn(opponent) {
        this.isImmune = false // Снимаем старый имунитет служанки в начале хода, если он есть.
        this.opponent = opponent
        this.takeCard()
        this.playCard(0);
    }

    takeCard() {
        this.cards.push(this.deck.pop())
    }

    showCard() {
        return this.cards[0]
    }

    playCard(idx) {
        let playedCard = this.cards.shift()
        console.log(`${this.name} играет карту ${playedCard}`)
        playedCard.play(this, this.opponent)
        this.grave.push(playedCard)
    }

    get points() {
        return this.cards[0].value
    }

    toString() {
        return `${this.name} ${this.cards[0]}`
    }
}