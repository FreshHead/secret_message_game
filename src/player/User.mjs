import Player from "./Player.mjs";
export default class User extends Player {
    constructor(firstCard) {
        super('Игрок', firstCard)
        const that = this;
        this.hand = new Proxy([firstCard], {
            get(target, prop) {
                if (['push', 'unshift', 'pop', 'shift'].includes(prop)) {
                    that.renderCard();
                }
                return target[prop];
            }
            // set(target, prop, val) {
            //     console.log("в ловушке set", { target, prop, val })
            //     target[prop] = val;
            //     that.renderCard();
            //     return true;
            // }
        });
    }

    renderCard() {
        const cardContainer = document.getElementById('card-container')
        cardContainer.textContent = '';

        this.hand.forEach((card) => {
            const uiCard = document.createElement('div');
            uiCard.innerHTML = card.name;
            uiCard.classList.add('card');
            document.getElementById('card-container').appendChild(uiCard);
        })
    }

    async chooseCardAndTarget(opponents) {
        new Promise(resolve => {

        })
        return {
            card: this.hand.pop(),
            target: opponents[0],
            cardToKill: 1
        }
    }
}
