export function initUi(player, placementDiv) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const uiOpponent = document.createElement('div');
    cardContainer.classList.add('player');

    uiOpponent.textContent = player.name;
    uiOpponent.appendChild(cardContainer);

    placementDiv.appendChild(uiOpponent);

    return new Proxy(player, {
        set(target, prop, value) {
            if (prop === 'isMakingTurn') {
                if (value) {
                    uiOpponent.classList.add('active');
                } else {
                    uiOpponent.classList.remove('active');
                }
            }

            if (prop === 'isWinner') {
                if (value) {
                    uiOpponent.classList.add('winner');
                }
            }

            if (prop === 'hand') {
                renderCards(cardContainer, target[prop]);
            }
            return true;
        },
        get(target, prop) {
            if (prop === 'hand') { // смена через pop() и push()
                renderCards(cardContainer, target[prop]);
            }
            if (prop === 'isDead') {
                if (target[prop]) {
                    cardContainer.textContent = '';
                    uiOpponent.classList.add('dead');
                }
            }
            return target[prop];
        }
    });
}

function renderCards(cardContainer, cards) {
    cardContainer.textContent = '';

    cards.forEach((card) => {
        const uiCard = document.createElement('div');
        uiCard.innerHTML = `${card.name} (${card.value})`;
        uiCard.classList.add('card');
        cardContainer.appendChild(uiCard);
    })
}
