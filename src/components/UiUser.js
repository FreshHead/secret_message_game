export default class UiUser extends HTMLElement {
    connectedCallback() {
        this.hand = this.model.hand;

        //const cards = this.hand.map((card) => document.createElement('ui-card'));

        this.innerHTML = `
			<div id="user">
				<div id="user__cards"></div>
			</div>
		`;
        for (let card of this.hand) {
            const uiCard = document.createElement('ui-card');
            uiCard.name = card.name
            uiCard.value = card.value
            document.getElementById('user__cards').appendChild(uiCard);
        }
    }

    async chooseCardAndTarget(opponents) {
        console.log('Выбери карту')
        document.getElementById('user__cards').addEventListener('click', (event) => {
            console.log("!!!")
        })

        console.log('Выбери цель')
    }
}

customElements.define('ui-user', UiUser);
