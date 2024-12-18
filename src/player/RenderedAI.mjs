import AI from "./AI.mjs";
import { initUi } from "./playerRendering.mjs";

export default class RenderedAI extends AI {
    constructor(name, firstCard) {
        super(name, firstCard)
        return initUi(this, document.getElementById('opponents'));
    }
}
