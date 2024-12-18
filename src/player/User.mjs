import Player from "./Player.mjs";
import { initUi } from "./playerRendering.mjs";

export default class User extends Player {
    cardContainer = document.getElementById('card-container');

    // TODO: Методы Управления картами должны передаваться через конструктор
    constructor(firstCard) {
        super('Игрок', firstCard)

        return initUi(this, document.getElementById('user'));
    }

    async chooseCardAndTarget(opponents) {
        // new Promise(resolve => {
        //     this.cardContainer.addEventListener('click', (event) => {
        //         console.log(event.target)
        //
        //     }, { once: true });
        //
        // })

        await this.sleep(2000);
        return {
            card: this.hand.pop(),
            target: opponents[0],
            cardToKill: 1
        }
    }
}
