import Deck from "./card/Deck.mjs";
import Player from './player/Player.mjs';
import AI from "./player/AI.mjs";

const deck = new Deck();
const players = [new AI('Махина', deck.getCard()), new AI('Игорёк', deck.getCard())];
let existingPlayers = players;

// Всё что касается выбора карт может находится в классе игрока.
// Он не делает конкретные игровые действия, а передаёт намерение в game loop.
// После игры свещенника ИИ должен запоминать какая карта была у противника. 
// Намерено решил не создавать класс Card с подклассами для хранения логики разыгрывания конкретной карты,
// чтобы карта не могла убивать игроков и т.д. switch в game loop вполне устраивает.

gameLoop();

function gameLoop() {
  while (deck.length > 0) {
    for (let i = 0; i < existingPlayers.length && deck.length > 0; i++) {
      makeTurn(players[i], players.toSpliced(i, 1));

      let existingPlayers = players.filter((player) => !player.isDead);
      if (existingPlayers.length === 1) {
        console.log(`${existingPlayers[0].name} победил уничтожив всех противников`);
        return;
      }
    }

    if (deck.length === 0) {
      console.log('Определение победителя по очкам:');
      const playersByHandValue = existingPlayers.sort((player1, player2) => player2.score - player1.score);
      const winners = playersByHandValue.reduce((acc, player) => {
        return acc.length === 0 || acc[0].hand[0] === player.hand[0] ? [...acc, player] : acc;
      }, [])

      if (winners.length === 1) {
        console.log(`Победитель: ${showPlayer(winners[0])}`);
      } else {
        console.log('Победителей несколько:');
        winners.forEach(showPlayer);
      }
      console.log('Результаты остальных:');
      playersByHandValue.toSpliced(0, 1).forEach(showPlayer); break;
    }
  }
}

/**
 * @param {{name: string, hand: Array<{name: string, value: number}>}} player
 */
function showPlayer(player) {
  console.log(`${player.name} с ${cardToString(player.hand[0])}`);
}

function cardToString(card){
return `${card.name} (${card.value})`
}

/**
  * @param {Array<Player>} player
  * @param {Array<Player>} oponents
  */
function makeTurn(player, oponents) {
  console.log(`Ходит ${player.name}`);
  player.isImmune = false; // Снимаем старый иммунитет, если он есть.
  player.hand.push(deck.getCard());

  const { card, opponent } = player.chooseCardAndOpponent(oponents);
  if (opponent.isImmune) {
    console.log(`${opponent.name} имеет имунитет.`);
    return;
  }

  switch (card.value) {
    case 1:
      console.log(`${player.name} играет стражницу против ${opponent.name}`);
      const cardToKill = Math.floor(Math.random() * (8 - 1)) + 1;
      console.log(`${player.name} решил, что у ${opponent.name} будет ${cardToKill}`);

      if (opponent.hand[0] === cardToKill) {
        console.log(`${player.name} отгадал, ${opponent.name} выбывает из игры`);
        opponent.isDead = true;
        break;
      } else {
        console.log(`${player.name} не отгадал`);
        break;
      }
    case 2:
      console.log(`${player.name} играет священника против ${opponent.name}`);
      console.log(`У ${opponent.name} в руке ${opponent.hand[0]}`);
      break;
    case 3:
      console.log(`${player.name} играет барона против ${opponent.name}`);

      if (card.value > opponent.hand[0].value) {
        console.log(`${cardToString(card)} > ${cardToString(opponent.hand[0])}. ${player.name} победил ${opponent.name}`);
        opponent.isDead = true
      } else if (card.value < opponent.hand[0].value) {
        console.log(`${cardToString(card)} < ${cardToString(opponent.hand[0])}. ${player.name} проиграл ${opponent.name}`);
        player.isDead = true
      } else {
        console.log(`Ничья. Игра продолжается.`)
      }
    default:
  }
}
