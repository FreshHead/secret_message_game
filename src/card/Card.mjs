export default class Card {

    constructor(name, value, play) {
        this.name = name;
        this.value = value;
        this.play = play || this.play;
    }

	
    play() {
        // Определите в наследнике.
    }

    immuneCheck(opponent) {
        if (opponent.isImmune) {
            console.log(`Но у ${opponent.name} есть иммунитет. Игра продолжается.`)
            return true;
        }
        return false;
    }

    toString() {
        return `${this.name} (${this.value})`
    }
}
