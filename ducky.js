window.onload = function () {
  const body = document.body;
  const duckIntervalIds = [];

  /**
   * @param {HTMLElement} duck HTML Element with class of duck
   * @returns {object} object containing random positions
   * @desc moves the duck image around the screen
   */

  function randomPosition() {
    const left = Math.random() * window.innerWidth;
    const top = Math.random() * window.innerHeight;
    return { left, top };
  }


  /**
   * @param {HTMLElement} duck 
   * @returns {object} contains the previous and current positions
   * @desc moves a duck and returns an object containing the last & current positions
   */


  function moveDuck(duck) {
    const { left, top } = randomPosition();
    const prevLeft = parseFloat(duck.style.left);
    const prevTop = parseFloat(duck.style.top);

    duck.style.left = `${left}px`;
    duck.style.top = `${top}px`;

    return {
      prevLeft,
      prevTop,
      currLeft: left,
      currTop: top,
    };
  }

  /**
   * @returns {object} object containing duck flap and move setTimeout ids
   * @desc 
   */

  function createDuck(duckId) {
    const duck = document.createElement('div');
    duck.classList.add('duck');
    moveDuck(duck); // creates random start position
    body.append(duck);

    // assign duckId to "data-" html attribute
    // setAttribute will auto lowercase your attribute name
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    duck.setAttribute('data-duckid', duckId);

    // set interval for duck to flap and capture intervalId
    const flap = setInterval(() => {
      console.log('flap');
      duck.classList.toggle('flap');
    }, 250);

    // set interval for duck to move and cature intervalId
    const move = setInterval(() => {
      const { prevLeft: left, currLeft: right } = moveDuck(duck);
      /*
      right represents moving closer to the right side of the screen
      left represents moving closer to the left side of the screen
      so if the right value is greater than left we're moving to the right
      side of the screen else to the left
      */
      // console.log(right - left);
      console.log('move');
      right > left ? duck.classList.add('right') : duck.classList.remove('right');
    }, 2000);

    return {
      duckId,
      timers: {
        flap,
        move
      }
    };
  }

  /**
   * @desc Queries the DOM for all instances of our duck and alerts the user when all instances are removed
   */

  function checkForWinner() {
    const ducks = document.querySelectorAll('.duck');
    console.log(ducks);

    if (ducks.length === 0) {
      alert('You Win!');
      createStartButton();
    };
  }


  /**
   * @param {object[]} arr 
   * @desc Removes a duck's flap and move intervals
   */


  function removeDuckIntervals(duckId) {
    // the duckId is expected to be a string that has a number character inside of it
    // we convert the string to a number
    const id = Number(duckId);

    // loop through the ducks and find the duck that we want to remove
    // and get its timers
    const { timers } = duckIntervalIds.find((duck) => duck.duckId === id);

    // clear each intervalTimer
    for (const key in timers) {
      clearInterval(timers[key]);
    }

  }

  /**
   * @param {HTMLElement} duck
   * @desc removes a duck element & related data from browser
   */

  function removeDuck(duck) {
    const { duckid } = duck.dataset;
    duck.style.display = 'none';
    duck.remove();
    removeDuckIntervals(duckid);

  };

  /**
   * @desc plays sound
   */

  function playSound(path) {
    if (typeof path !== 'string') return;

    const sound = new Audio(path);
    sound.play();
  }

  /**
   * @param {number} amount ducks to generate
   * @desc generates ducks
   */

  function generateDucks(amount = 5) {
    const { length } = duckIntervalIds;
    let id = length ? length : 0;

    for (let i = 0; i < amount; i++) {
      duckIntervalIds.push(createDuck(id));
      id += 1;
    }
  }

  function createStartButton() {
    const start = document.createElement('button');
    start.textContent = "Start Game";
    start.classList.add('start');
    body.append(start);

    function onStart() {
      generateDucks();
      start.removeEventListener('click', onStart);
      start.remove();
    }
    start.addEventListener("click", onStart);
  }

  // function playGame()

  // console.log(duckIntervalIds);

  // sets a click event on the window
  // this allows us to set one event listener rather than an individual listener
  // for each instance of our duck. If we click on an element with a class of duck
  // the element is removed
  window.addEventListener("click", e => {
    playSound('./audio/pew.mp3');

    // destructure the target property from event object
    const { target } = e;
    console.log(target);

    // look to see if the target has a class of duck
    // this adds our 'shot animation' if we've clicked on a duck
    // It then removes the duck and checks if any ducks are left
    if (target.classList.contains('duck')) {
      target.classList.add('shot');
      playSound('./audio/duckHit.mp3');
      playSound('./audio/duckHit.mp3');

      // remove intervalId's

      setTimeout(() => {
        removeDuck(target);
        checkForWinner();
      }, 500);

    }
  });
  createStartButton();

};
