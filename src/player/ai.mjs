export async function makeAiMove(cards, opponents) {
    const desiredCardIndex = Math.random() > 0.5 ? 0 : 1;
    const card = isCanBePlayed(cards[desiredCardIndex], cards[1 - desiredCardIndex]) ? cards[desiredCardIndex] : cards[1 - desiredCardIndex];
    cards = cards.splice(desiredCardIndex, 1);
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

