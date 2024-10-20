export default class UiCard extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class="card">
				<div class="card__name">${this.name}</div>
				<div class="card__value">${this.value}</div>
			</div>
		`;
		this.addEventListener('click', () => {
			// Добавь суда характеристики карты
			this.dispatchEvent(new CustomEvent('click'));
		})
	}
}

customElements.define('ui-card', UiCard);
