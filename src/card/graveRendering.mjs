export function initGraveUi() {
  const grave = document.getElementById('grave');
  return new Proxy([], {
    set(target, prop, value) {
      if (prop !== 'length') {
          const uiCard = document.createElement('div');
          uiCard.classList.add('card');


          const uiText = document.createElement('div');
          uiText.classList.add('card-text');
          uiText.innerHTML = `${value.name} (${value.value})`;
          uiCard.appendChild(uiText);
          uiCard.style.background = `url('assets/cards/${value.filename}') no-repeat center / cover`;

          grave.appendChild(uiCard);
      }
      return true;
    },
  });
}
