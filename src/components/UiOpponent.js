export default class Opponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.hand = this.model.hand;

		this.innerHTML = `
			<div class="opponent">
				<div class="opponent__name">${this.model.name}</div>
			</div>
		`;
	}

	async chooseCardAndTarget(opponents) {
		return this.model.chooseCardAndTarget(opponents)
	}
}

customElements.define('ui-opponent', Opponent);
