import Player from "../player/Player.mjs";

export default class Opponent extends HTMLElement {
	/**
	* @param {Player} data
	*/
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
			<div class="opponent">
				<div class="opponent__name">${this.name}</div>
			</div>
		`;
	}
}

customElements.define('ui-opponent', Opponent);
