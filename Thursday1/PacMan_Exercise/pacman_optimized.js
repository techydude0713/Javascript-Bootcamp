/*
*
* pacman_optimized.js
* Optimized version which uses less lines of code (39 < 56)
*
*/

// pos is the PacMan image position variable- it is set to 0 initially
var pos = 0;
//pageWidth is the width of the webpage. This is later used to calculate when Pac-Man needs to turn around.
let pageWidth = window.innerWidth;
//This array contains all the PacMan movement images
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

// this variable defines what direction should PacMan go into:
// 0 = left to right
// 1 = right to left (reverse)
var direction = 0;

// This variable helps determine which PacMan image should be displayed. It flips between values 0 and 1
var focus = 0;

// This function is called on mouse click. Every time it is called, it updates the PacMan image, position and direction on the screen.
function Run() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  !direction ? (pos >= pageWidth-imgWidth && direction++) : (pos <= 0 && direction--);
  img.src = pacArray[direction][focus];
  direction ? (pos -= 20) : (pos += 20);
  img.style.left = pos + 'px';
}

setInterval(Run,30);
//Please do not change
module.exports = checkPageBounds;
