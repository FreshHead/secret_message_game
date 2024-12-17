export function createHandProxy(cardsContainer, cards) {
    return new Proxy(cards, {
        get(target, prop) {
            renderCards(cardsContainer, cards);
            return target[prop];
        }
    });
}

function renderCards(cardsContainer, cards) {
    cardsContainer.textContent = '';

    cards.forEach((card) => {
        const uiCard = document.createElement('div');
        uiCard.innerHTML = `${card.name} (${card.value})`;
        uiCard.classList.add('card');
        cardsContainer.appendChild(uiCard);
    })
}
