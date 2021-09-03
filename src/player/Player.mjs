export default class Player {
    cards = []; // Не может быть более 2-х карт
    isImmune = false; // Этот ход защищён под действием служанки
    isDead = false; // Выбыл из игры
	constructor(name, deck, grave) {
		this.name = name
		this.grave = grave
      this.deck = deck
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

    get card() {
        return this.cards[0]
    }

    playCard() {
        let playedCard = this.chooseCard()
        console.log(`${this.name} играет карту ${playedCard}`)
        playedCard.play(this, this.opponent)
        this.grave.push(playedCard)
    }

    chooseCard() {
        let result
        this.cards.forEach((card, idx) => {
            if (card.value === 7) {
                console.log(`Графиня найдена!`)
                let otherIdx = idx ? 0 : 1
                let otherCard = this.cards[otherIdx].value
                if (otherCard.value === 6 || otherCard.value === 5) {
                    console.log(`${this.name} вынужденно сбрасывает граниню из-за ${otherCard}!`)
                    debugger
                    result = card
                    this.cards.splice(idx, 1)
                }
            }
        })
        return result || this.cards.shift()
    }

    swapCard(opponent) {
        let a = this.cards.shift()
        let b = opponent.cards.shift()
        this.cards.push(b)
        opponent.cards.push(a)
    }

    changeCard() {
        console.log(`${this.name} сбрасывает ${this.card} и берёт новую.`)
        this.grave.push(this.cards.shift())
        this.takeCard()
    }

    get points() {
        return this.cards[0].value
    }

    toString() {
        return `${this.name} ${this.cards[0]}`
    }
}