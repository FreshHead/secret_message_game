export async function getAiTurn(cards, opponents) {
    const desiredCard = Math.random() > 0.5 ? cards.shift() : cards.pop();
    const card = isCanBePlayed(desiredCard, cards[0]) ? desiredCard : cards[0];
    const cardToKill = card.value === 1 ? Math.floor(Math.random() * (8 - 1)) + 1 : null

    const target = opponents[Math.floor(Math.random() * (opponents.length - 1))];

    return {
        card,
        target,
        cardToKill
    }
}

function isCanBePlayed(card, otherCard) {
    return otherCard.value !== 7 || card.value === 5 || card.value === 6;
}

