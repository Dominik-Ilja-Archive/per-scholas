window.onload = function () {
  const body = document.body;

  console.log(body);

  //* 1. Create a <div> with the class "duck" and add it to the body.  Do this step by step
  //* ( 1. create the element
  //*   2. add a class to the element
  //*   3. append the element to the body )

  // const duck = document.createElement("div");
  // duck.classList.add("duck");
  // body.append(duck);

  //* 2. Next, use setInterval to toggle the "flap" class on the duck every 250 ms (1/4 second)
  //* https://www.w3schools.com/jsref/met_win_setinterval.asp
  // setInterval(() => {
  //   duck.classList.toggle('flap');
  // }, 250);


  //* 3. Now, let's move the duck using CSS "top" and "left". Create
  //* a function `moveDuck` that takes a duck object as an argument and sets the
  //* "top" and "left" CSS properties.
  //* HINT: Use Math.random() * window.innerWidth    for "left"
  //*       And Math.random() * window.innerHeight   for "top"

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


  //* 4. Try making the duck move to a different location every second (what did we use to do this several lines up??)
  // setInterval(() => {
  //   moveDuck(duck);
  // }, 1000);

  //* 5. Congratulations! Move on to part 2!

  // ---------------------------- PART 2 ---------------------------------

  //* 6. Now we will organize this better. Let's create
  //*    a "function" called createDuck() that does everything in 1-4
  //*    and "returns" the duck object

  function createDuck() {
    const duck = document.createElement('div');
    duck.classList.add('duck');
    moveDuck(duck);
    body.append(duck);

    setInterval(() => {
      duck.classList.toggle('flap');
    }, 250);

    setInterval(() => {
      const { prevLeft: left, currLeft: right } = moveDuck(duck);
      /*
        right represents moving closer to the right side of the screen
        left represents moving closer to the left side of the screen
        so if the right value is greater than left we're moving to the right
        side of the screen else to the left
      */
      console.log(right - left);
      right > left ? duck.classList.add('right') : duck.classList.remove('right');
    }, 2000);
  }

  //* 7. Now, let's create lots of ducks!  Use a "for" loop to create 5 ducks
  //*    using our fancy new createDuck() function

  for (let i = 0; i < 20; i++) {
    createDuck();
  }


  //* 8. The ducks are overlapping.  Modify createDuck so each time
  //*     it creates a duck, it appears in a random location
  //* HINT: You may want to create a `randomPosition()` function that you can use
  //*       to set the ducks' initial locations and in your `moveDuck()` function;

  //* 9. Keep going! Move onto part 3!

  // --------------------------- PART 3 ------------------------------------

  //* 11. BOOM. Attach a "click" handler that adds the "shot" class to
  //*     the duck when you click on it!

  window.addEventListener("click", e => {
    // destructure the target property from event object
    const { target } = e;

    // look to see if the target has a class of duck
    // this adds our 'shot animation' if we've clicked on a duck
    // It then removes the duck and checks if any ducks are left
    if (target.classList.contains('duck')) {
      target.classList.add('shot');

      setTimeout(() => {
        target.remove();
        checkForWinner();
      }, 500);

    }
  });

  //* 12. After a duck has been clicked on, remove it from the DOM after
  //*     a short delay (1 second) Hint Hint...use setTimeout
  //*     as for removing the element check out https://dzone.com/articles/removing-element-plain

  //* 13. Create a new function named checkForWinner() that reads the DOM
  //*     to see if there are any ducks left. (How can we check the DOM for more than one element?, and how can we see how many elements we get back) If not, alert "YOU WIN!"

  function checkForWinner() {
    const ducks = document.querySelectorAll('.duck');
    console.log(ducks);

    if (ducks.length === 0) alert('You Win!');
  }

  //* 14. BONUS: The ducks are moving pretty erratically, can you think
  //*     of a way to adjust the ducks speed based on how far needs to move?

  //* 15. BONUS: Add the "left" and "right" class to the duck based on the
  //*     direction the duck is flying and change the way the duck is facing

  // Done, you have accomplish another level of skill
};
