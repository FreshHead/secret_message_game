import Deck from "./card/Deck.mjs";
import Player from './player/Player.mjs';
import AI from "./player/AI.mjs";
import User from "./player/User.mjs";

// Импорт веб-компонент
import UiOpponent from "./components/UiOpponent.js";
import UiUser from "./components/UiUser.js";

// Всё что касается выбора карт может находится в классе игрока.
// Он не делает конкретные игровые действия, а передаёт намерение в game loop.
// После игры свещенника ИИ должен запоминать какая карта была у противника. 
// Намерено решил не создавать класс Card с подклассами для хранения логики разыгрывания конкретной карты,
// чтобы карта не могла убивать игроков и т.д. switch в game loop вполне устраивает.

document.getElementById('start-btn').addEventListener('click', gameLoop);

async function gameLoop() {
  const opponentsContainer = document.getElementById('opponents');
  opponentsContainer.textContent = '';

  console.log('\n\nИгра началась');

  const deck = new Deck();
  const grave = [];
  const opponents = [new AI('Махина', deck.getCard()), new AI('Игорёк', deck.getCard()), new AI('Игорёк2', deck.getCard())]
  const uiOpponents = opponents.map(opponent => {
    const uiOpponent = document.createElement('ui-opponent');
    uiOpponent.model = opponent
    document.getElementById('opponents').appendChild(uiOpponent);
    return uiOpponent;
  });

  const uiUser = document.createElement('ui-user');
  uiUser.model = new User(deck.getCard());
  document.getElementById('user-container').appendChild(uiUser);

  const players = [uiUser, ...uiOpponents];

  let existingPlayers = players;
  while (deck.length > 0 && existingPlayers.length > 1) {
    console.debug(existingPlayers.forEach(player => console.debug(playerToString(player), "color: orange")));
    for (let i = 0; ; i++) {
      existingPlayers = players.filter((player) => !player.isDead);
      if (i >= existingPlayers.length || existingPlayers.length === 1) {
        break;
      }
      console.log({currentPlayer: existingPlayers[i], opponents: existingPlayers.toSpliced(i, 1)})
      await makeTurn(existingPlayers[i], players.toSpliced(i, 1), deck, grave);

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
        console.log('Победитель:');
      } else {
        console.log('Победителей несколько:');
        winners.forEach(logPlayer);
      }
      console.log('Результаты остальных:');
      playersByHandValue.toSpliced(0, 1).forEach(logPlayer); break;
    }
  }
  console.log('Игра окончена.');
}

function logPlayer(player) {
  console.log(playerToString(player));
}

/**
 * @param {{name: string, hand: Array<{name: string, value: number}>}} player
 */
function playerToString(player) {
  return `%c${player.name} с ${cardToString(player.hand[0])}`;
}

function cardToString(card) {
  return `${card.name} (${card.value})`
}

/**
  * @param {Player} player
  * @param {Array<Player>} opponents
  */
async function makeTurn(player, opponents, deck, grave) {
  console.log(`\nХодит ${player.name}`);
  player.isImmune = false; // Снимаем старый иммунитет, если он есть.
  player.hand.push(deck.getCard());

  const posibleOpponents = opponents.filter((opponent) => !(opponent.isImmune && opponents.isDead));
  const { card, target, cardToKill } = await player.chooseCardAndTarget(posibleOpponents);

  switch (card.value) {
    case 1:
      console.log(`${player.name} играет стражницу против ${target.name}`);
      console.log(`${player.name} решил, что у ${target.name} будет ${cardToKill}`);

      if (target.hand[0] === cardToKill) {
        console.log(`${player.name} отгадал, ${target.name} выбывает из игры`);
        target.isDead = true;
      } else {
        console.log(`${player.name} не отгадал`);
      }
      break;
    case 2:
      console.log(`${player.name} играет священника против ${target.name}`);
      console.log(`У ${target.name} в руке ${cardToString(target.hand[0])}`);
      break;
    case 3:
      console.log(`${player.name} играет барона против ${target.name}`);

      if (card.value > target.hand[0].value) {
        console.log(`${cardToString(card)} > ${cardToString(target.hand[0])}. ${player.name} победил ${target.name}`);
        target.isDead = true
      } else if (card.value < target.hand[0].value) {
        console.log(`${cardToString(card)} < ${cardToString(target.hand[0])}. ${player.name} проиграл ${target.name}`);
        player.isDead = true
      } else {
        console.log(`Ничья. Игра продолжается.`)
      }
      break;
    case 4:
      console.log(`${player.name} играет служанку. Теперь у него имунитет до своего следующего хода`);
      player.isImmune = true;
      break;
    case 5:
      console.log(`${player.name} играет принца на ${target.name}. ${target.name} сбрасывает карту и берёт новую`);

      if (deck.length === 0) {
        console.error('В колоде закончились карты. Взять новую невозможно');
      } else {
        grave.push(target.hand.pop());
        target.hand.push(deck.getCard());
      }
      break;
    case 6:
      console.log(`${player.name} меняется картами с ${target.name}`);
      const playerCard = player.hand.pop();
      const targetCard = target.hand.pop();
      player.hand.push(targetCard);
      target.hand.push(playerCard);
      break;
    case 7:
      console.log(`${player.name} играет графиню. Ничего не происходит`);
      break;
    case 8:
      console.log(`${player.name} играет принцессу и проигрывает. С принцессами не шутят!`);
      player.isDead = true;
      break;
    default:
  }
  grave.push(card);
}
