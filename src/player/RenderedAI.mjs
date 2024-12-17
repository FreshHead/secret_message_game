import AI from "./AI.mjs";
import { createHandProxy } from "./handRendering.mjs";

export default class RenderedAI extends AI {
    constructor(name, firstCard) {
        super(name, firstCard)

        this.cardContainer = document.createElement('div');
        this.cardContainer.classList.add('card-container');
        const uiOpponent = document.createElement('div');
        uiOpponent.textContent = name;
        uiOpponent.appendChild(this.cardContainer);
        document.getElementById('opponents').appendChild(uiOpponent);

        this.hand = createHandProxy(this.cardContainer, [firstCard]);
    }
}
