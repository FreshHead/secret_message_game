const cards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
const shuffledCards = cards.sort(() => Math.floor(Math.random() * 3 - 1));
const bot1 = { name: 'Махина', hand: [shuffledCards.pop()] };
const bot2 = { name: 'Игорёк', hand: [shuffledCards.pop()] };
const players = [bot1, bot2];
let existingPlayers = players;

while (shuffledCards.length > 0) {
  for (let i = 0; i < existingPlayers.length; i++) {
    makeTurn(players[i], players.toSpliced(i, 1));

    let existingPlayers = players.filter((player) => !player.isDead);
    if (existingPlayers.length === 1) {
      console.log(`${existingPlayers[0].name} победил`);
      break;
    }
  }


  if (shuffledCards.length === 0) {
    const playersByHandValue = existingPlayers.sort((player1, player2) => player2.hand[0] - player1.hand[0]);
    const winners = playersByHandValue.reduce((acc, player) => {
      return acc.length === 0 || acc[0].hand[0] === player.hand[0] ? [...acc, player] : acc;
    }, [])

    if (winners.length === 1) {
      console.log('Победитель:');
      showResult(winners[0]);
    } else {
      console.log('Победителей несколько:');
      winners.forEach(showResult);
    }
    console.log('Результаты остальных:');
    playersByHandValue.toSpliced(0, 1).forEach(showResult);
    break;
  }
}

function showResult(player) {
  console.log(`${player.name} с ${player.hand[0]}`);
}

/**
  * @param {Array<number>} player
  * @param {Array<Array<number>>} oponents
  */
function makeTurn(player, oponents) {
  console.log(`Ходит ${player.name}`);
  player.hand.push(shuffledCards.pop());
  const playedCard = Math.random() > 0.5 ? player.hand.shift() : player.hand.pop();
  const selectedOponentIndex = Math.floor(Math.random() * (oponents.length - 1));
  const selectedOponent = oponents[selectedOponentIndex];

  switch (playedCard) {
    case 1:
      console.log(`${player.name} играет стражницу против ${selectedOponent.name}`);
      const cardToKill = Math.floor(Math.random() * (8 - 1)) + 1;
      console.log(`${player.name} решил, что у ${selectedOponent.name} будет ${cardToKill}`);

      if (selectedOponent.hand[0] === cardToKill) {
        console.log(`${player.name} отгадал, ${selectedOponent.name} выбывает из игры`);
        selectedOponent.isDead = true;
        break;
      } else {
        console.log(`${player.name} не отгадал`);
        break;
      }
    case 2:
      console.log(`${player.name} играет священника против ${selectedOponent.name}`);
      console.log(`У ${selectedOponent.name} в руке ${selectedOponent.hand[0]}`);
      break;
    default:
  }
}
