export function initUi(player, placementDiv) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const uiOpponent = document.createElement('div');
    uiOpponent.classList.add('player');

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

            if (prop === 'hand') { // Ловушка при перезаписи массива hand.
                renderCards(player.type, cardContainer, target[prop]);
            }
            return true;
        },
        get(target, prop) {
            if (prop === 'hand') { // Ловушка для изменения массива hand при push, unshift, pop, shift...
                renderCards(player.type, cardContainer, target[prop]);
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

function renderCards(playerType, cardContainer, cards) {
    cardContainer.textContent = '';

    cards.forEach((card) => {
        const uiCard = document.createElement('div');

        const uiText = document.createElement('div');
        uiText.classList.add('card-text');
        uiText.innerHTML = `${card.name} (${card.value})`;
        uiCard.appendChild(uiText);

        uiCard.classList.add('card');
        if (playerType === 'user') {
            uiCard.style.background = `url('assets/cards/${card.filename}') no-repeat center / cover`;
        } else {
            uiCard.classList.add('card-shirt');
        }
        cardContainer.appendChild(uiCard);
    })
}
