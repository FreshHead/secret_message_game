// const cards = [{name: 'Стражница'}, {name: 'Священник'}, {name: 'Барон'}];

const cards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
const shuffledCards = cards.sort(() => Math.floor(Math.random() * 3 - 1));
console.log(shuffledCards);
const bot1 = { name: 'Махина', hand: [shuffledCards.pop()] };
const bot2 = { name: 'Игорёк', hand: [shuffledCards.pop()] };
const players = [bot1, bot2];

while (shuffledCards.length > 0) {
  for (let i = 0; i < players.length; i++) {
    makeTurn(players[i], players.toSpliced(i, 1));
  }

  if (players === 1) {
    console.log(`${players[0].name} победил`);
    break;
  }

  if (shuffledCards.length === 0) {
    const playersByHandValue = players.sort((player1, player2) => player2.hand[0] - player1.hand[0]);
    const winner = playersByHandValue[0];
    console.log(`${winner.name} победил, с ${winner.hand[0]}`);
    console.log('Результаты остальных:');
    playersByHandValue.toSpliced(0, 1).forEach((player) => console.log(`${player.name} с ${player.hand[0]}`));
    break;
  }
}

/**
  * @param {Array<number>} player
  * @param {Array<Array<number>>} oponents
  */
function makeTurn(player, oponents) {
  console.log(`Ходит ${player.name}`);
  player.hand.push(shuffledCards.pop());
  const playedCard = Math.random() > 0.5 ? player.hand.shift() : player.hand.pop();

  switch (playedCard) {
    case 1:
      const selectedOponent = oponents[Math.floor(Math.random() * (oponents.length - 1))];
      console.log(`${player.name} играет стражницу против ${selectedOponent.name}`);
      const cardToKill = Math.floor(Math.random() * (8 - 1)) + 1;
      console.log(`${player.name} решил, что у ${selectedOponent.name} будет ${cardToKill}`);
      if (selectedOponent.hand[0] === cardToKill) {
        console.log(`${player.name} отгадал, ${selectedOponent.name} выбывает из игры`);
      } else {
        console.log(`${player.name} не отгадал`);
      }
      break;
    case 2:
      break;
    default:
  }
}
