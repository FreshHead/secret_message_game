import Player from "./Player.mjs";
export default class User extends Player {
    cardContainer = document.getElementById('card-container');

    // TODO: Методы Управления картами должны передаваться через конструктор
    constructor(firstCard) {
        super('Игрок', firstCard)
        this.cardContainer = document.getElementById('user-container').getElementsByClassName('card-container')[0];

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

    async chooseCardAndTarget(opponents) {
        new Promise(resolve => {
            this.cardContainer.addEventListener('click', (event) => {
                console.log(event.target)

            }, { once: true });

        })

        await this.sleep(2000);
        return {
            card: this.hand.pop(),
            target: opponents[0],
            cardToKill: 1
        }
    }
}
