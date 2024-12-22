const table = document.getElementById('table');

export function renderPlayedCard(card) {
  table.textContent = '';

  const uiCard = document.createElement('div');
  uiCard.classList.add('card');


  const uiText = document.createElement('div');
  uiText.classList.add('card-text');
  uiText.innerHTML = `${card.name} (${card.value})`;
  uiCard.appendChild(uiText);
  uiCard.style.background = `url('assets/cards/${card.filename}') no-repeat center / cover`;

  table.appendChild(uiCard);
}

export function clearPlayedCard() {
  table.textContent = '';
}
