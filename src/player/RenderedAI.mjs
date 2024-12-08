import AI from "./AI.mjs";

export default class RenderedAI extends AI {
    constructor(name, firstCard) {
        super(name, firstCard)

        this.cardContainer = document.createElement('div');
        this.cardContainer.classList.add('card-container');
        const uiOpponent = document.createElement('div');
        uiOpponent.textContent = name;
        uiOpponent.appendChild(this.cardContainer);
        document.getElementById('opponents').appendChild(uiOpponent);

        const that = this;
        this.hand = new Proxy([firstCard], {
            get(target, prop) {
                if (['push', 'unshift', 'pop', 'shift'].includes(prop)) {
                    that.renderCard();
                }
                return target[prop];
            }
        });
    }

    renderCard() {
        this.cardContainer.textContent = '';

        this.hand.forEach((card) => {
            const uiCard = document.createElement('div');
            uiCard.innerHTML = card.name;
            uiCard.classList.add('card');
            this.cardContainer.appendChild(uiCard);
        })
    }
}
