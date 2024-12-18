import Deck from "./card/Deck.mjs";
import { createAi, createUser } from "./player/playerFactory.mjs";
import { getAiTurn } from "./player/ai.mjs";
import { sleep } from "./utils.mjs";

// Всё что касается выбора карт может находится в классе игрока.
// Он не делает конкретные игровые действия, а передаёт намерение в game loop.
// После игры священника ИИ должен запоминать какая карта была у противника. 
// Намерено решил не создавать класс Card с подклассами для хранения логики разыгрывания конкретной карты,
// чтобы карта не могла убивать игроков и т.д. switch в game loop вполне устраивает.

document.getElementById('start-btn').addEventListener('click', gameLoop);

async function gameLoop() {
  const opponentsContainer = document.getElementById('opponents');
  opponentsContainer.textContent = '';

  console.log('\n\nИгра началась');

  const deck = new Deck();
  const grave = [];
  // const opponents = [new RenderedAI('Махина', deck.getCard()), new RenderedAI('Игорёк', deck.getCard()), new RenderedAI('Игорёк2', deck.getCard())]
  const opponents = [createAi('Махина', deck.getCard()), createAi('Игорёк', deck.getCard()), createAi('Костя', deck.getCard())]
  // const players = [new User(deck.getCard()), ...opponents];
  const players = [createUser('Игрок', deck.getCard()), ...opponents];

  let existingPlayers = players;
  while (deck.length > 0 && existingPlayers.length > 1) {
    console.debug('Начало круга. Игроки:\n' + playersToString(existingPlayers));
    for (let i = 0; ; i++) {
      existingPlayers = players.filter((player) => !player.isDead);
      if (i >= existingPlayers.length || existingPlayers.length === 1 || deck.length == 0) {
        break;
      }
      const currentPlayer = existingPlayers[i];
      console.debug('Текущий игрок: ', playerToString(currentPlayer));
      const currentPlayerOpponents = existingPlayers.toSpliced(i, 1);
      console.debug('Его противники:\n', playersToString(currentPlayerOpponents));
      logDeck(deck);
      console.debug('Сыгранные карты: ', grave.map(card => cardToString(card)).join(', '));
      await makeTurn(existingPlayers[i], players.toSpliced(i, 1), deck, grave);

      if (existingPlayers.length === 1) {
        existingPlayers[0].isWinner = true;
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

      winners.forEach(winner => winner.isWinner = true)

      if (winners.length === 1) {
        console.log('Победитель:', playerToString(winners[0]));
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

function waitForUserClick() {
  return new Promise((resolve) => {
    document.getElementById('next-btn').addEventListener('click', resolve, { once: true });
  })
}

function logPlayer(player) {
  console.log(playerToString(player));
}

function logDeck(deck) {
  console.debug('Карты в колоде: ', deck.length, deck.cards.map(card => cardToString(card)).join(', '));
}

function playersToString(players) {
  return players.map(playerToString).join('\n');
}
/**
 * @param {{name: string, hand: Array<{name: string, value: number}>}} player
 */
function playerToString(player) {
  return `${player.name} с ${cardToString(player.hand[0])}`;
}

function cardToString(card) {
  return `${card.name} (${card.value})`
}

/**
  * @param {Player} player
  * @param {Array<Player>} opponents
  */
async function makeTurn(player, opponents, deck, grave) {
  player.isMakingTurn = true;
  // await waitForUserClick();
  // Игроки это простой объект с набором свойств. Сверху на него навещивается Proxy и получается игрок с ui. Методы ИИ могут смотреть на св-во type, чтобы не использовать классы.
  // // Пробую без классов, чтобы в proxy не попадали методы при наследовании. Вообще закидывать в Proxy целый класс пока странно.
  console.log(`\nХодит ${player.name}`);
  // player.isImmune = false; // Снимаем старый иммунитет, если он есть.

  await sleep(2000);
  player.hand.push(deck.getCard());
  await sleep(2000);

  console.log(`${player.name} берёт карту и у него становится ${player.hand.length} карт`, player.hand.map(cardToString).join(', '));
  logDeck(deck);

  const posibleOpponents = opponents.filter((opponent) => !opponent.isImmune);
  const { card, target, cardToKill } = await getTurn(player, posibleOpponents);

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
        console.log(`рука ${target.name} после добора: ${cardToString(target.hand[0])}`);
      }
      break;
    case 6:
      console.log(`${player.name} меняется картами с ${target.name}`);
      const temp = [...player.hand];
      player.hand = target.hand;
      target.hand = temp;
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
  player.isMakingTurn = false;
  await sleep(2000);
}

async function getTurn(player, opponents) {
  switch (player.type) {
    case 'ai':
      return await getAiTurn(player.hand, opponents);
    default:
      return {
        card: player.hand.pop(),
        target: opponents[0],
        cardToKill: 1
      }
  }
}
