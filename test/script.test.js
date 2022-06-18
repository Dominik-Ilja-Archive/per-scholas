const expect = require('chai').expect;
const {
  Ship,
  generateRandomNumber,
  generateEnemyShips,
  generatePlayerShip,
  fight,
  willUserRetreat,
  determineGameResult
} = require('../script');

describe("Space Battle Testing", function () {
  describe('Ship Class', function () {
    it('should have a class named Ship', function () {
      const ship = new Ship(1, 1, 1);
      expect(ship).to.be.a('object');
    });
    it('should be an instance of Ship', function () {
      const ship = new Ship(1, 1, 1);
      expect(ship).to.be.an.instanceOf(Ship);
    });
    it('should have a property of hull', function () {
      const ship = new Ship(1, 1, 1);
      expect(ship).to.have.a.property('hull');
    });
    it('should have a property of firepower', function () {
      const ship = new Ship(1, 1, 1);
      expect(ship).to.have.a.property('firepower');
    });
    it('should have a property of accuracy', function () {
      const ship = new Ship(1, 1, 1);
      expect(ship).to.have.a.property('accuracy');
    });
    it('should have a property of name', function () {
      const ship = new Ship(1, 1, 1);
      expect(ship).to.have.a.property('name');
    });
    it('should have an attack method', function () {
      const ship = new Ship(1, 1, 1);
      expect(ship).to.have.a.property('attack');
    });
    it('should have a setter for updating the hull', function () {
      const ship = new Ship(1, 1, 1);
      ship.hull = 5;
      expect(ship.hull).to.equal(5);
    });
    it('should throw an error if a non number value is passed to hull', function () {
      expect(function () {
        new Ship('1', 1, 1);
      }).to.throw();
    });
    it('should throw an error if 0 is passed to hull', function () {
      expect(function () {
        new Ship(0, 1, 1);
      }).to.throw();
    });
    it('should throw an error if number less than 0 is passed to hull', function () {
      expect(function () {
        new Ship(-10, 1, 1);
      }).to.throw();
    });
    it('should throw an error if a non number value is passed to firepower', function () {
      expect(function () {
        new Ship(1, null, 1);
      }).to.throw();
    });
    it('should throw an error if a non number value is passed to accuracy', function () {
      expect(function () {
        new Ship(1, 1);
      }).to.throw();
    });
    it('should throw an error if a non string value is passed to name', function () {
      expect(function () {
        new Ship(1, 1, 1, 1);
      }).to.throw();
    });
  });
  describe('generateRandomNumber Function', function () {
    it('should return a number', function () {
      const num = generateRandomNumber();
      expect(num).to.be.a('number');
    });
    it('should generate a number between 0 & 10 if no parameters are passed', function () {
      const num = generateRandomNumber();
      expect(num).to.be.within(0, 10);
    });
    it('should generate a number between a specified range', function () {
      const num = generateRandomNumber(3, 6);
      expect(num).to.be.within(3, 6);
    });
    it('should return the exact number passed if min and max are the same', function () {
      const num = generateRandomNumber(6, 6);
      expect(num).to.equal(6);
    });
    it('should return a number with no decimal', function () {
      const num = generateRandomNumber(0.11, 0.99, { round: true, place: 0 });
      const hasDecimal = String(num).includes('.');
      expect(hasDecimal).to.be.false;
    });
    it('should return a number rounded to first place', function () {
      const num = generateRandomNumber(0.11, 0.99, { round: true, place: 1 });
      const length = String(num).split('.')[1].length;
      expect(length).to.equal(1);
    });
    it('should return a number rounded to second place', function () {
      const num = generateRandomNumber(0.111, 0.999, { round: true, place: 2 });
      const length = String(num).split('.')[1].length;
      expect(length).to.be.within(1, 2);
    });
    it('should throw an error if place is greater than 20', function () {
      // const length = String(num).split('.')[1].length;
      expect(function () {
        generateRandomNumber(0.111, 0.999, { round: true, place: 21 });
      }).to.throw();
    });
    it('should throw an error if min is greater than max', function () {
      expect(function () {
        generateRandomNumber(10, 0);
      }).to.throw();
    });
  });
  describe('generateEnemyShips Function', function () {
    it('should return an empty array', function () {
      const ships = generateEnemyShips();
      expect(ships).to.be.a('array');
      expect(ships.length).to.equal(0);
    });
    it('should return an empty array if input is not a number', function () {
      const ships = generateEnemyShips('10');
      expect(ships.length).to.equal(0);
    });
    it('should return an array of the same length as the number passed', function () {
      const ships = generateEnemyShips(10);
      expect(ships.length).to.equal(10);
    });
    it('should return an instances of the Ship class', function () {
      const ships = generateEnemyShips(2);
      expect(ships[0]).to.be.an.instanceOf(Ship);
      expect(ships[1]).to.be.an.instanceOf(Ship);
    });
    it('should generate a hull value between 3 & 6', function () {
      const ships = generateEnemyShips(10);
      ships.forEach(ship => expect(ship.hull).to.be.within(3, 6));
    });
    it('should generate a firepower value between 2 & 4 for each ship', function () {
      const ships = generateEnemyShips(10);
      ships.forEach(ship => expect(ship.firepower).to.be.within(2, 4));
    });
    it('should generate an accuracy value between 0.6 & 0.8', function () {
      const ships = generateEnemyShips(10);
      ships.forEach(ship => expect(ship.accuracy).to.be.within(0.6, 0.8));
    });
  });
  describe('generatePlayerShip Function', function () {
    it('should be an instance of Ship class', function () {
      expect(generatePlayerShip()).to.be.an.instanceOf(Ship);
    });
    it('should have a hull of 20', function () {
      expect(generatePlayerShip().hull).to.equal(20);
    });
    it('should have a firepower of 5', function () {
      expect(generatePlayerShip().firepower).to.equal(5);
    });
    it('should have an accuracy of 0.7', function () {
      expect(generatePlayerShip().accuracy).to.equal(0.7);
    });
    it('should have a name of Ishimura', function () {
      expect(generatePlayerShip().name).to.equal('Ishimura');
    });
  });
  describe('fight function', () => {
    it('should throw an error if first parameter isn\'t an instance of Ship', () => {
      expect(function () {
        fight();
      }).to.throw();
      expect(function () {
        fight('');
      }).to.throw();
    });
    it('should throw an error if second parameter isn\'t an instance of Ship', () => {
      expect(function () {
        fight();
      }).to.throw();
      expect(function () {
        fight('', '');
      }).to.throw();
    });
    it('should return the ship that lost', () => {
      const user = new Ship(1, 1, 1);
      const alien = new Ship(1, 1, 1);
      const loser = fight(user, alien);

      expect(loser.hull).to.be.below(1);
    });
  });
  // describe('willUserRetreat function', () => {
  //   it('should return a boolean', function () {
  //     return new Promise(function (resolve) {
  //       const result = willUserRetreat();
  //       expect(result).to.be.a('boolean');
  //       resolve();
  //     });
  //   });
  // });
  describe('determineGameResult function', () => {
    it('should throw an error if a ship object isn\'t passed to first parameter', function () {
      expect(function () {
        determineGameResult();
      }).to.throw();
    });
    it('should throw an error if a boolean isn\'t passed to second parameter', function () {
      const ship = new Ship(1, 1, 1);
      expect(function () {
        determineGameResult(ship, null);
      }).to.throw();
    });
  });
  // describe('playGame function', () => {
  //   it('')
  // });
});
