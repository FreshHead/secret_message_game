export default class Card {

    constructor(name, value, play) {
        this.name = name;
        this.value = value;
        this.play = play || this.play;
    }

    play() {
        // Определите в наследнике.
    }

    toString() {
        return `${this.name} (${this.value})`
    }
}