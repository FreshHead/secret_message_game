export function initUi(player, placementDiv) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const uiOpponent = document.createElement('div');
    cardContainer.classList.add('player');

    uiOpponent.textContent = player.name;
    uiOpponent.appendChild(cardContainer);

    placementDiv.appendChild(uiOpponent);

    return new Proxy(player, {
        get(target, prop) {
            console.log({ prop, value: target[prop] })
            if (prop === 'isMakingTurn') {
                if (target[prop]) {
                    uiOpponent.classList.add('active');
                } else {
                    uiOpponent.classList.remove('active');
                }
            }
            if (prop === 'hand') {
                renderCards(cardContainer, target[prop]);
            }
            if (prop === 'isDead') {
                if (target[prop]) {
                    uiOpponent.classList.add('dead');
                }
            }
            return target[prop];
        }
    });
}

export function createDeadProxy(uiPlayer, cards) {
    return new Proxy(new Boolean(false), {
        get(target, prop) {
            if (target == true) {
                console.log("!!")
                uiPlayer.classList.add('dead');
                cards = [];
            }
            return target[prop];
        }
    })
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
