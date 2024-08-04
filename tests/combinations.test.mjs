import Player from "../src/player/Player.mjs";
import Princess from "../src/card/Princess.mjs";
import assert from "assert/strict";
import King from "../src/card/King.mjs";
import Deck from "../src/card/Deck.mjs";

const player = new Player("Player", new Deck([new Princess(), new King()]), []);
const opponent = new Player("Opponent", [], []);
player.makeTurn(opponent, 1);
assert.strictEqual(player.isDead).toBe(true);
