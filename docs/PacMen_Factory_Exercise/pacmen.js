/*
*
* Pacman Factory 2.0
* With animations and angles!
*
*/





const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

const pacMen = []; // This array holds all the pacmen

// These function returns an object with random values, dependent on the value.
// Random velocity for pacman.
function setToRandomVel(scale) {
  return {
    x: Math.random() * (scale - 3) + 3 |0,
    y: Math.random() * (scale - 3) + 3 |0,
  };
}
// Random start pos for pacman.
function setToRandomPOS(x,y) {
  return {
    x: Math.random() * x |0,
    y: Math.random() * y |0,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandomVel(10); // {x:?, y:?}
  let position = setToRandomPOS(window.innerWidth-100,window.innerHeight-100); // {x:?, y:?}

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png'; // Fills in a template for later.
  newimg.width = 100;


  // Determines what PacMan's animation is.
  newimg.animCount = 0;

  // Determines what PacMan's direction is.
  newimg.pacdirection = 0;

  // Used to create the interval of the anim loop.
  newimg.init = false;

  // Style
  // The angle of PacMan
  newimg.style.transform = `rotate(${calcAngle(velocity.y,velocity.x)}deg)`;

  // Left to right
  newimg.style.left = position.x;

  // Top to bottom
  newimg.style.top = position.y;



  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    // This happens once, otherwise, animations won't work right.
    if (!item.newimg.init)
    {
      setInterval(animLogic, 800/item.velocity.x, item);
      item.newimg.init = true;
    }
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // If PacMan tries to go through the right wall...
  if (item.position.x >= window.innerWidth-105)
  {
    // ...reverse direction and change anim direction.
    item.velocity.x = item.velocity.x * -1;
    item.newimg.pacdirection = 1;
    item.newimg.src = pacArray[item.newimg.pacdirection][item.newimg.animCount%2];
    item.newimg.style.transform = `rotate(${calcAngle(item.velocity.y,item.velocity.x)}deg)`;
  }
  // Otherwise, if PacMan tries to go through the left wall...
  else if (item.position.x <= 0)
  {
    // ...reverse direction and change anim direction.
    item.velocity.x = Math.abs(item.velocity.x);
    item.newimg.pacdirection = 0;
    item.newimg.src = pacArray[item.newimg.pacdirection][item.newimg.animCount%2];
    item.newimg.style.transform = `rotate(${calcAngle(item.velocity.y,item.velocity.x)}deg)`;
  }

  // If PacMan tries to go through the bottom wall...
  if (item.position.y >= window.innerHeight-105)
  {
    // ...reverse direction.
    item.velocity.y = item.velocity.y * -1;
    item.newimg.style.transform = `rotate(${calcAngle(item.velocity.y,item.velocity.x)}deg)`;
  }
  // Otherwise, if PacMan tries to go through the top wall...
  else if (item.position.y <= 0)
  {
    // ...reverse direction.
    item.velocity.y = Math.abs(item.velocity.y);
    item.newimg.style.transform = `rotate(${calcAngle(item.velocity.y,item.velocity.x)}deg)`;
  }

  // TODO: detect collision with all walls and make pacman bounce
}

// animLogic: used to determine what animation pacman should play.
function animLogic(item) {
  // Points the image source to the pacArray, which determines direrction and frame.
  // Why does this also happen in checkCollisions? Better animation.
  item.newimg.src = pacArray[item.newimg.pacdirection][item.newimg.animCount%2];
  item.newimg.animCount++;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
  document.getElementById("activate").disabled = false;
  document.getElementById("count").innerHTML = `${pacMen.length} on screen.`;
}

/*
* How do I explain this? I literally found the math off YouTube lol.
*
* Seriously though, calcAngle takes Y, X as arguements, and uses a
* 2D physics calculation to determine the angle of the ball.
* That equation is tan^-1(Y/X). Simple right? Nope!
* The equalivent for tan^-1 is Math.atan, but that function takes RADIANS!
* However, degree * pi/180 = radians, and radians/pi*180 = degrees,
* so it was simple to convert degrees, to radians and back again.
* GO PHYSICS!
*/
function calcAngle(opposite, adjacent) {
  return (Math.atan((opposite*Math.PI/180) / (adjacent*Math.PI/180)) /Math.PI*180);
}


//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
