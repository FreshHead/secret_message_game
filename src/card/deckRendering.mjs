export function initUi(cards) {
  const cardCount = document.createElement('div');
  cardCount.classList.add('card-count');
  cardCount.textContent = cards.length;

  document.getElementById('deck').appendChild(cardCount);

  return new Proxy(cards, {
    get(target, prop) {
      if (prop === 'pop') {
        cardCount.textContent = target.length;
      }
      return target[prop];
    }
  })
}
