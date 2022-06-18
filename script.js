// https://perscholas.instructure.com/courses/1008/assignments/179355
const readlineSync = require('readline-sync');
const colors = require('colors/safe');

class Ship {
  constructor(hull, firepower, accuracy, name = 'SS Ship') {
    if (typeof hull !== 'number') throw new Error('hull must be a number');
    if (hull <= 0) throw new Error('hull must be greater than 0');
    if (typeof firepower !== 'number') throw new Error('firepower must be a number');
    if (typeof accuracy !== 'number') throw new Error('accuracy must be a number');
    if (typeof name !== 'string') throw new Error('name must be a string');

    this._hull = hull;
    this._firepower = firepower;
    this._accuracy = accuracy;
    this._name = name;
  }
  attack(ship) {
    const roll = generateRandomNumber(0, 1, { round: true, place: 1 });

    console.log(colors.blue(`${this.name} attacks!`));
    if (this.accuracy >= roll) {
      ship.hull = ship.hull - this.firepower;
      console.log(colors.red(`Attack hit! ${ship.name}'s hull was reduced to ${ship.hull}`));
    } else {
      console.log(colors.yellow('Attack Missed!'));
    }
    console.log('------------------------------');
  }
  set hull(n) {
    this._hull = n;
  }
  get hull() {
    return this._hull;
  }
  get firepower() {
    return this._firepower;
  }
  get accuracy() {
    return this._accuracy;
  }
  get name() {
    return this._name;
  }
}

/**
 * @param {number} [min = 0] lowest number to be returned
 * @param {number} [max = 10] highest number to be returned
 * @param {object} [options = {round: false, place: null}] if we want to round number and to what place
 * @returns {number} number generated between min and max
 * @desc Generates a number between min and max. Is inclusive of min and max.
 */

function generateRandomNumber(min = 0, max = 10, options = { round: false, place: null }) {
  if (min > max) throw new Error('min cannot be greater than max');

  let randomNum = Math.random() * (max - min) + min;
  const { round, place } = options;

  if (round && typeof place === 'number') {
    if (options.place > 20) throw new Error('Place must be between 0 & 20');
    randomNum = +randomNum.toFixed(options.place);
  }
  return randomNum;
}

/**
 * @param {number} amount amount of ships to create
 * @returns {Ship[]} an array of generated ships
 * @desc Creates the specified amount of ships and returns them in an array
 */

function generateEnemyShips(amount) {
  const ships = [];

  if (typeof amount === 'number') {
    for (let i = 0; i < amount; i++) {
      const hull = generateRandomNumber(3, 6, { round: true, place: 0 });
      const firepower = generateRandomNumber(2, 4, { round: true, place: 0 });
      const accuracy = generateRandomNumber(0.6, 0.8, { round: true, place: 1 });

      ships.push(new Ship(hull, firepower, accuracy, `Alien ${i}`));
    }
  }

  return ships;
}

/**
 * @returns {Ship} the player ship
 * @desc Creates the player ship
 */

function generatePlayerShip() {
  return new Ship(20, 5, 0.7, 'Ishimura');
}

/**
 * @param {Ship} user The user's ship
 * @param {Ship} alien The alien's ship
 * @returns {Ship} the ship that lost
 * @desc Has the user's ship and alien fight until one doesn't have an hull left
 */

function fight(user, alien) {
  // instanceof is lower precedence than ! therefore we need to wrap
  // the instanceof check in parenthesis 
  if (!(user instanceof Ship)) throw new Error('user must be an instance of Ship class');
  if (!(alien instanceof Ship)) throw new Error('alien must be an instance of Ship class');

  while (user.hull > 0 && alien.hull > 0) {
    user.attack(alien);

    if (alien.hull > 0) {
      alien.attack(user);
    }
    readlineSync.question('Hit enter to continue');
    console.log('------------------------------');
  }

  return alien.hull <= 0 ? alien : user;
}

/**
 * @returns {boolean} returns true if the user wants to retreat or false if they want to attack
 * @desc Asks the user if they want to attack or retreat
 */


function willUserRetreat() {
  // ask the user if they want to attack or retreat until they give a proper response
  let correctAnswer = false;
  let willRetreat = false;
  while (!correctAnswer) {
    const answer = readlineSync.question('Attack (y) or Retreat (r) ').toLowerCase();
    console.log('------------------------------');

    if (answer === 'y' || answer === 'r') {
      correctAnswer = true;
      willRetreat = answer === 'r';
    }

  }
  return willRetreat;
}

/**
 * @param {Ship} user The user's ship
 * @param {boolean} didRetreat Boolean representing if the user retreated or not
 * @desc Determines the outcome of the game
 */

function determineGameResult(user, didRetreat) {
  if (!(user instanceof Ship)) throw new Error('user must be an instance of Ship Class');
  if (typeof didRetreat !== 'boolean') throw new Error('didRetreat must be a boolean');

  if (user.hull > 0 && !didRetreat) {
    console.log('You Win!');
  }
  else if (didRetreat) {
    console.log('You live to fight another day');
  }
  else {
    console.log('You Lose!');
  }
}

function playGame() {
  // bonus goals 1 : The aliens send a random number of ships to attack Earth
  const shipAmount = generateRandomNumber(6, 10, { round: true, place: 0 });
  const alienShips = generateEnemyShips(shipAmount);
  const ishimura = generatePlayerShip();
  let didRetreat = false;

  for (let i = 0; i < alienShips.length; i++) {
    const alienShip = alienShips[i];

    // ships fighting
    fight(ishimura, alienShip);

    // if ishimura has been destroyed exit the loop
    // else ishimura destroyed enemy ship
    if (ishimura.hull <= 0) break;
    else {
      console.log(colors.magenta(`Aliens remaining: ${alienShips.length - (i + 1)}`));

      // we destroyed the last ship. exit the loop
      if (i === alienShips.length - 1) break;

      // ask the user if they want to retreat
      // exit the loop up if they do
      if (willUserRetreat()) {
        didRetreat = true;
        break;
      }
    }

  }

  determineGameResult(ishimura, didRetreat);

}

playGame();

module.exports.Ship = Ship;
module.exports.generateRandomNumber = generateRandomNumber;
module.exports.generateEnemyShips = generateEnemyShips;
module.exports.generatePlayerShip = generatePlayerShip;
module.exports.fight = fight;
module.exports.willUserRetreat = willUserRetreat;
module.exports.determineGameResult = determineGameResult;
module.exports.playGame = playGame;
